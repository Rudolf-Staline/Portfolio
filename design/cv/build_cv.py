"""Build the editable, custom CV from content.json.

Run with the primary Python runtime. Render the DOCX with the documents
skill's render_docx.py, inspect every page, then publish its matching PDF.
"""
from io import BytesIO
from pathlib import Path
import argparse
import json
import re
from copy import deepcopy

from PIL import Image
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads(Path(__file__).with_name('content.json').read_text())
BLACK = '000000'
INK = '182B40'
BLUE = '244F85'
GRAY = '4D5964'
FONT = 'Arial'
DISPLAY = 'Georgia'
CONTENT_WIDTH = 515.9

def set_font(run, size=None, bold=None, color=None, family=FONT):
    run.font.name = family
    run._element.get_or_add_rPr().rFonts.set(qn('w:ascii'), family)
    run._element.rPr.rFonts.set(qn('w:hAnsi'), family)
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.font.bold = bold
    if color:
        run.font.color.rgb = RGBColor.from_string(color)
    return run

def rich(paragraph, text, **kwargs):
    for part in re.split(r'(\*\*.*?\*\*)', text):
        if not part:
            continue
        bold = part.startswith('**') and part.endswith('**')
        run = paragraph.add_run(part[2:-2] if bold else part)
        set_font(run, **(kwargs | ({'bold': True} if bold else {})))

def link(paragraph, text, url, size=9.5, bold=False, color=BLACK):
    rel = paragraph.part.relate_to(url, RT.HYPERLINK, is_external=True)
    element = OxmlElement('w:hyperlink')
    element.set(qn('r:id'), rel)
    element.set(qn('w:history'), '1')
    r = OxmlElement('w:r')
    props = OxmlElement('w:rPr')
    fonts = OxmlElement('w:rFonts')
    fonts.set(qn('w:ascii'), FONT)
    fonts.set(qn('w:hAnsi'), FONT)
    props.append(fonts)
    c = OxmlElement('w:color'); c.set(qn('w:val'), color); props.append(c)
    s = OxmlElement('w:sz'); s.set(qn('w:val'), str(round(size * 2))); props.append(s)
    if bold:
        b = OxmlElement('w:b'); props.append(b)
    r.append(props)
    t = OxmlElement('w:t'); t.text = text; r.append(t)
    element.append(r)
    paragraph._p.append(element)

def floating_portrait(paragraph):
    portrait = Image.open(ROOT / 'public/images/portrait.webp')
    output = BytesIO()
    portrait.save(output, format='PNG')
    output.seek(0)
    run = paragraph.add_run()
    shape = run.add_picture(output, height=Pt(97))
    inline = shape._inline
    anchor = OxmlElement('wp:anchor')
    for key, val in {'distT':'0','distB':'0','distL':'0','distR':'0',
                     'simplePos':'0','relativeHeight':'251658240',
                     'behindDoc':'0','locked':'0','layoutInCell':'1',
                     'allowOverlap':'1'}.items():
        anchor.set(key, val)
    simple = OxmlElement('wp:simplePos'); simple.set('x','0'); simple.set('y','0')
    anchor.append(simple)
    for axis, offset in [('H', int(Pt(CONTENT_WIDTH) - shape.width)), ('V', 0)]:
        pos = OxmlElement('wp:position' + axis)
        pos.set('relativeFrom', 'margin')
        off = OxmlElement('wp:posOffset'); off.text = str(offset)
        pos.append(off); anchor.append(pos)
    anchor.append(deepcopy(inline.extent))
    effect = OxmlElement('wp:effectExtent')
    for k in ['l','t','r','b']:
        effect.set(k, '0')
    anchor.append(effect)
    anchor.append(OxmlElement('wp:wrapNone'))
    docpr = deepcopy(inline.docPr)
    docpr.set('descr', 'Portrait de Rudolf Hounlete')
    anchor.append(docpr)
    frame = OxmlElement('wp:cNvGraphicFramePr'); anchor.append(frame)
    anchor.append(deepcopy(inline.graphic))
    inline.getparent().replace(inline, anchor)

def set_style(document, name, size, *, bold=False, family=FONT,
              before=0, after=0, leading=None, keep=False, color=BLACK):
    style = document.styles[name]
    style.font.name = family
    style.font.size = Pt(size)
    style.font.bold = bold
    style.font.italic = False
    style.font.all_caps = False
    style.font.color.rgb = RGBColor.from_string(color)
    rpr = style.element.get_or_add_rPr()
    fonts = rpr.find(qn('w:rFonts'))
    if fonts is None:
        fonts = OxmlElement('w:rFonts'); rpr.insert(0, fonts)
    fonts.set(qn('w:ascii'), family); fonts.set(qn('w:hAnsi'), family)
    for attribute in ['asciiTheme','hAnsiTheme','eastAsiaTheme','cstheme']:
        fonts.attrib.pop(qn('w:' + attribute), None)
    for name in ['spacing', 'position', 'iCs', 'numPr']:
        for child in list(rpr.findall(qn('w:' + name))):
            rpr.remove(child)
    pf = style.paragraph_format
    pf.space_before, pf.space_after = Pt(before), Pt(after)
    pf.line_spacing = Pt(leading or size * 1.22)
    pf.keep_with_next = keep
    pf.widow_control = True
    return style

def body(document, text, *, size=10.8, after=3, keep=False, color=BLACK):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.line_spacing = Pt(13.2 if size < 11 else 14.0)
    paragraph.paragraph_format.space_after = Pt(after)
    paragraph.paragraph_format.keep_with_next = keep
    rich(paragraph, text, size=size, color=color)
    return paragraph

def bullet(document, text, *, compact=False, keep=False):
    paragraph = document.add_paragraph()
    pf = paragraph.paragraph_format
    pf.left_indent = Pt(10)
    pf.first_line_indent = Pt(-10)
    pf.tab_stops.add_tab_stop(Pt(10))
    pf.space_after = Pt(3.0 if compact else 4.2)
    pf.line_spacing = Pt(13.1 if compact else 14.3)
    pf.keep_with_next = keep
    pf.keep_together = True
    set_font(paragraph.add_run('•\t'), size=10.6 if compact else 11.0, color=GRAY)
    rich(paragraph, text, size=10.6 if compact else 11.0, color=BLACK)
    return paragraph

def section_heading(document, title, *, before=9):
    paragraph = document.add_paragraph(title, style='Heading 1')
    paragraph.paragraph_format.space_before = Pt(before)
    return paragraph

def project(document, number, *, compact=False, with_context=True):
    project = DATA['projects'][number - 1]
    paragraph = document.add_paragraph(style='Heading 2')
    paragraph.paragraph_format.space_before = Pt(6 if compact else 13)
    paragraph.paragraph_format.space_after = Pt(2.4)
    set_font(paragraph.add_run(f'{number:02d}  '), size=10.3, bold=False, color=BLUE)
    if project['url']:
        link(paragraph, project['name'], project['url'], size=11.7, bold=True)
    else:
        set_font(paragraph.add_run(project['name']), size=11.7, bold=True)
    # Benefit and outcome form a plain text line, separate from the heading.
    meta = document.add_paragraph()
    meta.paragraph_format.space_after = Pt(3.0 if compact else 4.5)
    meta.paragraph_format.line_spacing = Pt(11.3 if compact else 12.0)
    meta.paragraph_format.keep_with_next = True
    set_font(meta.add_run(project['proof']), size=9.3 if compact else 9.8,
             bold=True, color=BLUE)
    set_font(meta.add_run('  ·  ' + project['stack']), size=9.3 if compact else 9.8,
             color=GRAY)
    for i, text in enumerate(project['bullets']):
        last = i == len(project['bullets']) - 1
        bullet(document, text, compact=compact,
               keep=not last or (with_context and bool(project.get('context'))))
    if with_context and project.get('context'):
        body(document, project['context'], size=9.2, after=3, color=GRAY)

def new_page(document, title, subtitle):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_after = Pt(0)
    paragraph.paragraph_format.line_spacing = Pt(1)
    paragraph.add_run().add_break(WD_BREAK.PAGE)
    p = document.add_paragraph(title, style='Heading 1')
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.line_spacing = Pt(29)
    for r in p.runs:
        set_font(r, size=24, family=DISPLAY, bold=False)
    body(document, subtitle, size=9.5, after=3, color=GRAY)

def build(output):
    document = Document()
    section = document.sections[0]
    section.page_width, section.page_height = Cm(21), Cm(29.7)
    section.left_margin = section.right_margin = Cm(1.4)
    section.top_margin = Cm(1.1)
    section.bottom_margin = Cm(1.15)
    section.header_distance = Cm(.35)
    section.footer_distance = Cm(.45)
    set_style(document, 'Normal', 11, leading=14, after=3)
    set_style(document, 'Title', 32, family=DISPLAY, leading=35, after=3, keep=True)
    set_style(document, 'Subtitle', 11.3, leading=14, after=2, keep=True)
    set_style(document, 'Heading 1', 9.8, bold=True, leading=13,
              before=9, after=4, keep=True)
    set_style(document, 'Heading 2', 11.7, bold=True, leading=15,
              before=10, after=3, keep=True)
    set_style(document, 'Footer', 8.2, leading=10, color=GRAY)
    # Keep Word theme colors and paragraph borders out of the CV.
    for name in ['Title','Subtitle','Heading 1','Heading 2']:
        style = document.styles[name]
        pp = style.element.find(qn('w:pPr'))
        if pp is not None:
            for border in list(pp.findall(qn('w:pBdr'))):
                pp.remove(border)

    paragraph = document.add_paragraph(DATA['name'], style='Title')
    floating_portrait(paragraph)
    paragraph = document.add_paragraph(DATA['role'], style='Subtitle')
    for r in paragraph.runs:
        r.bold = True
    document.add_paragraph(DATA['focus'], style='Subtitle')
    body(document, DATA['location'] + '  ·  ' + DATA['phone'], size=9.4, after=1,
         keep=True, color=GRAY)
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_after = Pt(3)
    paragraph.paragraph_format.line_spacing = Pt(11)
    link(paragraph, DATA['email'], 'mailto:' + DATA['email'], size=9.4, color=GRAY)
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_after = Pt(9)
    paragraph.paragraph_format.line_spacing = Pt(11)
    link(paragraph, 'rudolf-portfolio.rudolf43.chatgpt.site', DATA['portfolio'], size=9.1, color=GRAY)
    set_font(paragraph.add_run('  ·  '), size=9.1, color=GRAY)
    link(paragraph, 'github.com/rudolf-staline', DATA['github'], size=9.1, color=GRAY)
    body(document, DATA['profile'], size=10.8, after=7)

    paragraph = document.add_paragraph()
    pf = paragraph.paragraph_format
    pf.line_spacing = Pt(19)
    pf.space_after = Pt(0)
    pf.keep_with_next = True
    pf.tab_stops.add_tab_stop(Pt(177))
    pf.tab_stops.add_tab_stop(Pt(354))
    set_font(paragraph.add_run('3 bronzes\t2e sur 77\t4e sur 262'),
             size=16, bold=True, color=BLUE)
    paragraph = document.add_paragraph()
    pf = paragraph.paragraph_format
    pf.line_spacing = Pt(11)
    pf.space_after = Pt(4)
    pf.tab_stops.add_tab_stop(Pt(177)); pf.tab_stops.add_tab_stop(Pt(354))
    set_font(paragraph.add_run('Kaggle et Zindi\tAfrican Credit Scoring\tFinancial Stress Prediction'),
             size=8.9, color=GRAY)

    section_heading(document, 'EXPÉRIENCE PROFESSIONNELLE', before=7)
    paragraph = document.add_paragraph()
    pf = paragraph.paragraph_format
    pf.tab_stops.add_tab_stop(Pt(CONTENT_WIDTH), WD_TAB_ALIGNMENT.RIGHT)
    pf.keep_with_next = True
    pf.space_after = Pt(1)
    set_font(paragraph.add_run('CHOUBEL CONSULTING'), size=10.8, bold=True)
    set_font(paragraph.add_run('\t15 juil. - 28 août 2026'), size=9.4, color=GRAY)
    body(document, 'Stagiaire en développement logiciel  ·  Casablanca',
         size=9.4, after=0, keep=True, color=GRAY)
    project(document, 1, compact=True, with_context=False)

    section_heading(document, 'FORMATION', before=8)
    for school, date, detail in DATA['education']:
        paragraph = document.add_paragraph()
        pf = paragraph.paragraph_format
        pf.tab_stops.add_tab_stop(Pt(CONTENT_WIDTH), WD_TAB_ALIGNMENT.RIGHT)
        pf.keep_with_next = True
        pf.space_after = Pt(0)
        pf.line_spacing = Pt(12.2)
        set_font(paragraph.add_run(school), size=10.2, bold=True)
        if date:
            set_font(paragraph.add_run('\t' + date), size=9.2, color=GRAY)
        body(document, detail, size=9.5, after=3.0, color=GRAY)

    section_heading(document, 'COMPÉTENCES', before=6)
    for name, values in DATA['skills']:
        body(document, '**' + name + ' :**  ' + values, size=10.2, after=1.5)

    section_heading(document, 'PROJETS', before=7)
    project(document, 2, compact=True)
    project(document, 3, compact=True)

    new_page(document, 'Projets de machine learning',
             'Modélisation, validation et développement de pipelines  ·  Projets 04 à 09')
    for n in range(4, 10):
        project(document, n)

    new_page(document, 'Projets logiciels et expérimentaux',
             'Applications, systèmes physiques et analyse quantitative  ·  Projets 10 à 14')
    for n in range(10, 15):
        project(document, n)

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.LEFT
    footer.paragraph_format.tab_stops.clear_all()
    footer_style_tabs = document.styles['Footer'].element.find(qn('w:pPr')).find(qn('w:tabs'))
    if footer_style_tabs is not None:
        footer_style_tabs.getparent().remove(footer_style_tabs)
    footer.paragraph_format.tab_stops.add_tab_stop(Pt(CONTENT_WIDTH), WD_TAB_ALIGNMENT.RIGHT)
    set_font(footer.add_run('Rudolf HOUNLETE  ·  Machine learning et développement logiciel\t'),
             size=8.2, color=GRAY)
    for field in ['PAGE', 'NUMPAGES']:
        if field == 'NUMPAGES':
            set_font(footer.add_run(' / '), size=8.2, color=GRAY)
        fld = OxmlElement('w:fldSimple'); fld.set(qn('w:instr'), ' ' + field + ' ')
        r = OxmlElement('w:r')
        props = OxmlElement('w:rPr')
        fonts = OxmlElement('w:rFonts'); fonts.set(qn('w:ascii'), FONT); fonts.set(qn('w:hAnsi'), FONT)
        props.append(fonts)
        size = OxmlElement('w:sz'); size.set(qn('w:val'), '16'); props.append(size)
        color = OxmlElement('w:color'); color.set(qn('w:val'), GRAY); props.append(color)
        r.append(props)
        result = OxmlElement('w:t'); result.text = '1' if field == 'PAGE' else '3'
        r.append(result); fld.append(r)
        footer._p.append(fld)
    document.core_properties.title = 'Rudolf Hounlete CV Machine learning et développement logiciel'
    document.core_properties.subject = 'Formation, expérience professionnelle et 14 projets'
    document.core_properties.author = 'Rudolf Hounlete'
    document.core_properties.keywords = 'Python, machine learning, React, TypeScript, ingénierie'
    document.core_properties.comments = ''
    output.parent.mkdir(parents=True, exist_ok=True)
    document.save(output)
    print(output)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, default=ROOT / 'public/CV_Rudolf_HOUNLETE.docx')
    args = parser.parse_args()
    build(args.output)
