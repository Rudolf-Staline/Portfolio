"""Typeset the visual CV independently from the editable text version."""
from pathlib import Path
import json, re
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

ROOT=Path(__file__).resolve().parents[2]
D=json.loads(Path(__file__).with_name('content.json').read_text())
for name,file in [('R','DejaVuSans.ttf'),('B','DejaVuSans-Bold.ttf'),('C','DejaVuSans-Bold.ttf')]:
 pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
pdfmetrics.registerFontFamily('R',normal='R',bold='B',italic='R',boldItalic='B')
W,H=595.276,841.89
INK='#142539'; BLUE='#244ED8'; DEEP='#132C48'; MUTED='#566779'; LINE='#CED7E0'; WHITE='#FFFFFF'; PAPER='#F7F9FC'
OUT=ROOT/'public/CV_Rudolf_HOUNLETE.pdf'
c=canvas.Canvas(str(OUT),pagesize=(W,H))
c.setTitle('Rudolf Hounlete | Machine learning et développement logiciel')
c.setAuthor('Rudolf Hounlete')
def rect(x,t,w,h,color):
 c.setFillColor(HexColor(color));c.rect(x,H-t-h,w,h,fill=1,stroke=0)
def line(x,t,w,color=LINE):
 c.setStrokeColor(HexColor(color));c.setLineWidth(.5);c.line(x,H-t,x+w,H-t)
def txt(s,x,t,size=10,font='R',color=INK):
 c.setFont(font,size);c.setFillColor(HexColor(color));c.drawString(x,H-t-size,s)
def mark(s,x,t,color=BLUE):
 c.saveState();tx=c.beginText(x,H-t-8);tx.setFont('B',8);tx.setCharSpace(1.25);tx.setFillColor(HexColor(color));tx.textOut(s);c.drawText(tx);c.restoreState()
def markup(s):
 s=escape(s)
 return re.sub(r'\*\*(.*?)\*\*',r'<b>\1</b>',s)
def para(s,x,t,w,size=9.2,leading=13,color=INK,bold=False,draw=True):
 st=ParagraphStyle('p',fontName='B' if bold else 'R',fontSize=size,leading=leading,textColor=HexColor(color),spaceBefore=0,spaceAfter=0)
 p=Paragraph(markup(s),st);_,h=p.wrap(w,1000)
 if draw:p.drawOn(c,x,H-t-h)
 return h
def footer(n):
 line(32,804,W-64)
 txt('RUDOLF HOUNLETE',32,815,7.2,'B',MUTED)
 txt('MACHINE LEARNING / LOGICIEL',227,815,7,'R',MUTED)
 txt(f'{n:02d} / 03',W-69,813,9,'B',BLUE)
def project(p,n,x,t,w,draw=True):
 y=t
 if draw:mark(f'{n:02d}',x,y+3)
 h=para(p['name'],x+24,y,w-24,12.2,15,bold=True,draw=draw);y+=h+9
 y+=para(p['proof'],x,y,w,9.4,12.5,BLUE,True,draw=draw)+9
 for b in p['bullets']:
  if draw:rect(x,y+4,2.5,2.5,BLUE)
  y+=para(b,x+10,y,w-10,9.1,12.4,draw=draw)+5
 y+=5
 y+=para(p['stack'],x,y,w,7.8,10.4,MUTED,draw=draw)
 if p.get('context') and n>=10:
  y+=5+para(p['context'],x,y+5,w,7.5,10,MUTED,draw=draw)
 if draw and p['url']:c.linkURL(p['url'],(x,H-t-34,x+w,H-t),relative=0,thickness=0)
 return y-t

# First page: identity and essential evidence, with a permanent left rail.
rect(0,0,W,H,WHITE);rect(0,0,194,H,DEEP)
c.setFillColor(HexColor('#E9EFF6'));c.circle(97,H-112,67,fill=1,stroke=0)
c.drawImage(ImageReader(str(ROOT/'public/images/portrait.webp')),28,H-181,138,138,mask='auto')
mark('CONTACT',25,221,'#8FB5FF')
y=246
for s in [D['location'],D['phone'],D['email'],'github.com/rudolf-staline']:
 y+=para(s,25,y,148,8.3,12.6,WHITE)+9
c.linkURL('mailto:'+D['email'],(25,H-310,175,H-278),thickness=0)
c.linkURL(D['github'],(25,H-342,175,H-307),thickness=0)
mark('FORMATION',25,359,'#8FB5FF')
y=385
for title,date,detail in D['education']:
 short={'École Centrale Casablanca':'Centrale Casablanca','Classes préparatoires scientifiques':'Préparation scientifique'}.get(title,title)
 y+=para(short,25,y,146,9.3,12.4,WHITE,True)+4
 if date:y+=para(date,25,y,146,8,11,'#9FB8D1')+4
 y+=para(detail,25,y,146,8.1,11.4,'#D1DEEB')+9
mark('COMPÉTENCES',25,y+8,'#8FB5FF');y+=33
for name,values in D['skills']:
 y+=para(name.upper(),25,y,146,7.5,10,'#9FB8D1',True)+4
 y+=para(values,25,y,146,8.0,11.6,WHITE)+10
assert y<795,('sidebar',y)
x=225;w=338
mark('ÉLÈVE INGÉNIEUR / PROMOTION 2028',x,38)
txt('Rudolf',x,61,34,'R');txt('HOUNLETE',x,100,34,'C')
# Explicit two-line role.
txt('Machine learning',x,157,16,'B');txt('et développement logiciel',x,180,16,'B')
y=218+para(D['profile'],x,218,w,9.2,13.3)
line(x,y+17,w);y+=34
for off,value,label in [(0,'3','bronzes Kaggle / Zindi'),(119,'2e / 77','African Credit Scoring'),(238,'4e / 262','Financial Stress')]:
 txt(value,x+off,y,21,'C',BLUE);para(label,x+off,y+31,100,7.4,10.5,MUTED)
y+=75
mark('EXPÉRIENCE EN ENTREPRISE',x,y);y+=25
txt('CHOUBEL CONSULTING',x,y,11.5,'B');y+=20
para('Stage en développement logiciel · Casablanca<br/>15 juillet - 28 août 2026'.replace('<br/>',' / '),x,y,w,8.3,12,MUTED);y+=36
txt('01',x,y,9,'B',BLUE);txt('RiskSim',x+25,y-3,17,'C');y+=25
para('Application Windows · Simulation des coûts de projet',x,y,w,8.3,12,BLUE,True);y+=24
for b in D['projects'][0]['bullets']:
 rect(x,y+4,2.5,2.5,BLUE);y+=para(b,x+11,y,w-11,9.3,13.1)+8
y+=7
line(x,y,w);y+=17
y+=project(D['projects'][1],2,x,y,w)
assert y<795,('main',y)
line(x,804,w);txt('CV / 2026',x,815,7.5,'B',MUTED);txt('01 / 03',W-69,813,9,'B',BLUE)
c.showPage()

def page_header(n,title,sub):
 rect(0,0,W,H,PAPER)
 mark('RUDOLF HOUNLETE / CV',32,26,MUTED)
 txt(f'{n:02d}',W-91,35,38,'C','#DDE5EF')
 txt(title,32,52,23,'C')
 txt(sub,32,86,9,'R',MUTED)
 line(32,109,W-64)

page_header(2,'Machine learning et outils métier','Projets 03 à 08 / Résultats, méthodes et contributions')
x1,x2,cw=32,310,253
y=129
for a,b in [(3,4),(5,6),(7,8)]:
 h=max(project(D['projects'][a-1],a,x1,y,cw,False),project(D['projects'][b-1],b,x2,y,cw,False))
 project(D['projects'][a-1],a,x1,y,cw);project(D['projects'][b-1],b,x2,y,cw)
 y+=h+12
 if b<8:line(x1,y,W-64);y+=12
last=y
assert last<790,('page2',last)
footer(2);c.showPage()
page_header(3,'Logiciel et expérimentation','Projets 09 à 14 / Applications, vision et systèmes physiques')
y=132
for a,b in [(9,10),(11,12),(13,14)]:
 h=max(project(D['projects'][a-1],a,x1,y,cw,False),project(D['projects'][b-1],b,x2,y,cw,False))
 project(D['projects'][a-1],a,x1,y,cw);project(D['projects'][b-1],b,x2,y,cw)
 y+=h+16
 if b<14:line(x1,y,W-64);y+=16
assert y<796,('page3',y)
footer(3);c.save();print(OUT)
