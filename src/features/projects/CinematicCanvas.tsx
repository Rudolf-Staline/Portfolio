import { useEffect, useRef } from 'react'
export type CinemaKind = 'automl' | 'geoai' | 'traffic' | 'audio' | 'forex' | 'soliton' | 'risk' | 'financial' | 'clinical'
type Point = { x:number; y:number; z:number }

/** Procedural 3D compositions, projected onto canvas; no project data is simulated. */
export function CinematicCanvas({kind, running, close}:{kind:CinemaKind;running:boolean;close:boolean}) {
  const ref=useRef<HTMLCanvasElement>(null)
  const clock=useRef(0)
  useEffect(()=>{
    const canvas=ref.current
    if(!canvas) return
    const ctx=canvas.getContext('2d')
    if(!ctx) return
    const preference=matchMedia('(prefers-reduced-motion: reduce)')
    let frame=0, previous=0, width=1000, height=650
    const render=(now:number)=>{
      if(now-previous<32&&running&&!preference.matches){frame=requestAnimationFrame(render);return}
      const delta=previous?Math.min(60,now-previous):0;previous=now
      if(running&&!preference.matches) clock.current+=delta*.00028
      const t=clock.current
      const yaw=Math.sin(t*.18)*.22+.35, pitch=-.25+Math.cos(t*.14)*.06
      const scale=Math.min(width/1050,height/650)*(close?1.2:1)
      const project=(p:Point)=>{
        const x=p.x*Math.cos(yaw)+p.z*Math.sin(yaw), z=-p.x*Math.sin(yaw)+p.z*Math.cos(yaw)
        const y=p.y*Math.cos(pitch)-z*Math.sin(pitch), zz=p.y*Math.sin(pitch)+z*Math.cos(pitch)
        const perspective=900/(900+zz)
        return {x:width*.63+x*scale*perspective,y:height*.49+y*scale*perspective,d:perspective,z:zz}
      }
      ctx.clearRect(0,0,width,height)
      const bg=ctx.createRadialGradient(width*.66,height*.44,0,width*.6,height*.5,width*.7)
      bg.addColorStop(0,kind==='clinical'?'#173c3d':'#20332b');bg.addColorStop(.6,'#0c1717');bg.addColorStop(1,'#080e10');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height)
      const line=(a:Point,b:Point,color:string,lineWidth=1)=>{const pa=project(a),pb=project(b);ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.strokeStyle=color;ctx.lineWidth=lineWidth*scale;ctx.stroke()}
      const dot=(p:Point,color:string,r=2)=>{const q=project(p);ctx.beginPath();ctx.arc(q.x,q.y,Math.max(.4,r*scale*q.d),0,Math.PI*2);ctx.fillStyle=color;ctx.fill()}
      // Dust sits in camera depth, moving slowly enough to keep the text readable.
      for(let i=0;i<65;i++){const a=i*2.399;dot({x:Math.sin(a)*540,y:Math.cos(i*3.8)*310,z:Math.sin(i*.7+t*.08)*320},i%5?'#a9c5b623':'#e2ae7459',i%5?.8:1.5)}
      if(kind==='automl'){
        const layers:Point[][]=[]
        for(let layer=0;layer<6;layer++){
          const nodes=Array.from({length:9},(_,i)=>({x:(layer-2.5)*105,y:Math.cos(i*Math.PI*2/9+t*.09)*150,z:Math.sin(i*Math.PI*2/9+t*.09)*150}))
          layers.push(nodes)
          nodes.forEach((p,i)=>{line(p,nodes[(i+1)%9],'#a5cdb537');dot(p,layer%2?'#dcb78d':'#adc8b9',3)})
          if(layer>0) nodes.forEach((p,i)=>{[0,2,5].forEach(j=>line(layers[layer-1][(i+j)%9],p,'#b2c8b41d'));const from=layers[layer-1][i],f=(t*.7+i*.13)%1;dot({x:from.x+(p.x-from.x)*f,y:from.y+(p.y-from.y)*f,z:from.z+(p.z-from.z)*f},'#f6d2a0',3.3)})
        }
        for(let ring=0;ring<3;ring++){let previousPoint:Point|undefined;for(let i=0;i<=120;i++){const a=i*Math.PI/60;const p={x:Math.cos(a)*(260+ring*25),y:Math.sin(a)*45+215,z:Math.sin(a)*(160+ring*20)};if(previousPoint)line(previousPoint,p,'#8cae8d22');previousPoint=p}}
      }else if(kind==='audio'){
        for(let ribbon=0;ribbon<28;ribbon++){
          let prev:Point|undefined
          for(let i=0;i<=110;i++){
            const x=(i-55)*8, envelope=Math.exp(-Math.pow((i-55)/38,2))
            const y=Math.sin(i*.14-t*1.6+ribbon*.09)*85*envelope+Math.cos(i*.08+t*.6)*30
            const p={x,y:y+(ribbon-14)*3,z:(ribbon-14)*10+Math.sin(i*.05-t*.5)*60}
            if(prev)line(prev,p,ribbon%4===0?'#e7b5829a':'#a3cbb34a',ribbon%4===0?1.5:.8)
            prev=p
          }
        }
      }else if(kind==='soliton'){
        const center=((t*.9)%1.6)*1050-525
        for(let cell=0;cell<20;cell++){
          const x=(cell-9.5)*40
          let prev:Point|undefined
          for(let j=0;j<=48;j++){const a=j*Math.PI/12;const p={x:x+(j/48-.5)*26,y:120+Math.cos(a)*25,z:Math.sin(a)*25};if(prev)line(prev,p,'#ba9b6d9c',1.5);prev=p}
          if(cell<19)line({x:x+13,y:145,z:0},{x:x+27,y:145,z:0},'#cab9929a')
          const pulse=1/Math.cosh((x-center)/55)
          dot({x,y:120-pulse*220,z:0},pulse>.35?'#ffcb85':'#acc3ae',pulse>.35?5:2)
        }
        for(let ribbon=0;ribbon<16;ribbon++){let prev:Point|undefined;for(let j=0;j<180;j++){const x=(j-90)*5,p={x,y:105-220/Math.cosh((x-center)/55),z:(ribbon-8)*4};if(prev)line(prev,p,ribbon%4===0?'#f3c080c5':'#dab57a37',1.4);prev=p}}
      }else if(kind==='risk'){
        for(let ribbon=0;ribbon<38;ribbon++){let prev:Point|undefined;for(let i=0;i<100;i++){const x=(i-50)*8, y=130-Math.exp(-Math.pow((i-41)/19,2))*240*(1+.12*Math.sin(ribbon*.2+t*.3)),p={x,y,z:(ribbon-19)*11};if(prev)line(prev,p,ribbon%6===0?'#e3b382aa':'#9ec6ae36');prev=p}}
        for(let i=0;i<3;i++){const x=[-50,110,220][i];line({x,y:-170,z:0},{x,y:150,z:0},'#e2c5a538',.8)}
      }else if(kind==='clinical'){
        for(let latitude=0;latitude<22;latitude++){let prev:Point|undefined;const b=(latitude/21)*Math.PI;for(let j=0;j<=90;j++){const a=j*Math.PI/45+t*.08,p={x:Math.sin(b)*Math.cos(a)*210,y:Math.cos(b)*210,z:Math.sin(b)*Math.sin(a)*210};if(prev)line(prev,p,latitude%4===0?'#d2c39875':'#8ed6c543');prev=p;if(j%12===0)dot(p,'#e5d3b7',1.7)}}
        for(let ring=0;ring<3;ring++){let prev:Point|undefined;for(let i=0;i<=120;i++){const a=i*Math.PI/60,p={x:Math.cos(a)*300,y:Math.sin(a)*65,z:Math.sin(a)*290};p.y+=Math.cos(a)*ring*20;if(prev)line(prev,p,'#e0b8843a');prev=p}}
      }else{
        for(let i=0;i<40;i++){
          const x=(i-19.5)*18,z=Math.sin(i*.32)*65, h=45+Math.sin(i*.28)*55+i*3.2
          const base={x,y:150,z}, top={x,y:150-h,z},offset=8
          line(base,top,i%3?'#a9c5b5a5':'#dca37da5',4)
          line({x:x-offset,y:150-h,z},{x:x+offset,y:150-h,z},'#c5d1b3a0')
          line({x,y:150-h-25,z},{x,y:150-h+25,z},'#ced5b255')
          for(let k=1;k<5;k++)line({x,y:150,z:z+k*16},{x,y:150-h,z:z+k*16},i%3?'#abc7b41d':'#dfa8841d',2)
        }
        let prev:Point|undefined;for(let i=0;i<140;i++){const x=(i-70)*6,p={x,y:80-Math.sin(i*.045+t*.2)*90-i*.7,z:-40};if(prev)line(prev,p,'#f6c98db3',2);prev=p}
      }
      // A floor reflection and atmospheric falloff give the geometry a physical setting.
      const fog=ctx.createLinearGradient(0,0,0,height);fog.addColorStop(0,'#07101125');fog.addColorStop(.68,'#07101100');fog.addColorStop(1,'#071011ee');ctx.fillStyle=fog;ctx.fillRect(0,0,width,height)
      if(running&&!preference.matches)frame=requestAnimationFrame(render)
    }
    const size=()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);if(!running||preference.matches)render(performance.now())}
    const resize=new ResizeObserver(size);resize.observe(canvas);size();frame=requestAnimationFrame(render)
    return()=>{cancelAnimationFrame(frame);resize.disconnect()}
  },[kind,running,close])
  return <canvas ref={ref} className="cinematic-canvas" aria-hidden="true"/>
}
