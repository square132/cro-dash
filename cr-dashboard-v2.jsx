import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         ResponsiveContainer, ComposedChart, Line, ReferenceLine } from "recharts";

const P={navy:'#192A4A',teal:'#116B78',dk:'#0D5260',lt:'#A3D8C7',bg:'#EAF4F4',gray:'#4A4A4A',mg:'#7A7A7A',lg:'#F7F8FA',rule:'#DDE5E8',gn:'#0B8C0B',am:'#B87800',rd:'#C42B2B'};

// ── FUNNEL DATA ───────────────────────────────────────────────────────────────
const MFD=[
  {p:"Jul'24",mkt:18,sales:14,partner:9,cs:7,opps:20,won:3,wonAmt:820},
  {p:"Aug'24",mkt:15,sales:12,partner:7,cs:6,opps:17,won:2,wonAmt:610},
  {p:"Sep'24",mkt:20,sales:15,partner:10,cs:8,opps:22,won:4,wonAmt:1050},
  {p:"Oct'24",mkt:22,sales:16,partner:11,cs:7,opps:24,won:3,wonAmt:870},
  {p:"Nov'24",mkt:19,sales:14,partner:9,cs:6,opps:21,won:3,wonAmt:760},
  {p:"Dec'24",mkt:24,sales:18,partner:12,cs:9,opps:28,won:5,wonAmt:1280},
  {p:"Jan'25",mkt:16,sales:11,partner:7,cs:5,opps:15,won:2,wonAmt:520},
  {p:"Feb'25",mkt:18,sales:13,partner:8,cs:6,opps:18,won:3,wonAmt:710},
  {p:"Mar'25",mkt:21,sales:15,partner:10,cs:7,opps:22,won:3,wonAmt:650},
  {p:"Apr'25",mkt:23,sales:16,partner:11,cs:8,opps:24,won:4,wonAmt:920},
  {p:"May'25",mkt:25,sales:18,partner:13,cs:9,opps:26,won:4,wonAmt:1050},
  {p:"Jun'25",mkt:28,sales:20,partner:14,cs:10,opps:29,won:4,wonAmt:1120},
  {p:"Jul'25",mkt:12,sales:9,partner:5,cs:4,opps:10,won:1,wonAmt:245},
];
const QFD=[
  {p:"Q1'24",mkt:75,sales:57,partner:38,cs:27,opps:77,won:8,wonAmt:2140},
  {p:"Q2'24",mkt:80,sales:60,partner:40,cs:28,opps:82,won:10,wonAmt:2280},
  {p:"Q3'24",mkt:82,sales:61,partner:41,cs:29,opps:85,won:10,wonAmt:2450},
  {p:"Q4'24",mkt:91,sales:68,partner:46,cs:34,opps:99,won:13,wonAmt:2720},
  {p:"Q1'25",mkt:72,sales:52,partner:33,cs:24,opps:78,won:8,wonAmt:1820},
  {p:"Q2'25",mkt:97,sales:71,partner:48,cs:34,opps:103,won:11,wonAmt:2360},
  {p:"Q3'25",mkt:30,sales:22,partner:14,cs:11,opps:30,won:2,wonAmt:735},
];
const WFD=Array.from({length:13},(_,i)=>({p:`W${i+15}`,mkt:[12,8,14,11,9,13,10,15,11,8,12,14,10][i],sales:[7,9,6,8,10,7,8,6,9,11,8,7,9][i],partner:[4,3,5,4,3,6,4,5,3,4,5,4,3][i],cs:[2,3,2,3,2,2,3,2,3,2,3,2,2][i],opps:[6,5,7,6,5,8,5,7,5,5,7,7,4][i],won:[1,0,1,1,0,1,0,1,0,1,1,1,0][i],wonAmt:[285,0,340,260,0,420,0,310,0,290,365,285,0][i]}));

// ── CONVERSION RATE TREND ─────────────────────────────────────────────────────
const CONV_M=[
  {p:"Jul'24",newRate:31,expRate:52,newOpps:14,expOpps:6, newWonAmt:580,expWonAmt:240,newLostAmt:180,expLostAmt:0},
  {p:"Aug'24",newRate:27,expRate:50,newOpps:11,expOpps:6, newWonAmt:490,expWonAmt:120,newLostAmt:220,expLostAmt:0},
  {p:"Sep'24",newRate:33,expRate:58,newOpps:14,expOpps:8, newWonAmt:710,expWonAmt:340,newLostAmt:280,expLostAmt:0},
  {p:"Oct'24",newRate:28,expRate:55,newOpps:16,expOpps:8, newWonAmt:620,expWonAmt:250,newLostAmt:340,expLostAmt:0},
  {p:"Nov'24",newRate:30,expRate:57,newOpps:14,expOpps:7, newWonAmt:540,expWonAmt:220,newLostAmt:290,expLostAmt:0},
  {p:"Dec'24",newRate:35,expRate:62,newOpps:19,expOpps:9, newWonAmt:890,expWonAmt:390,newLostAmt:180,expLostAmt:0},
  {p:"Jan'25",newRate:24,expRate:48,newOpps:10,expOpps:5, newWonAmt:380,expWonAmt:140,newLostAmt:310,expLostAmt:0},
  {p:"Feb'25",newRate:28,expRate:54,newOpps:12,expOpps:6, newWonAmt:510,expWonAmt:200,newLostAmt:220,expLostAmt:0},
  {p:"Mar'25",newRate:27,expRate:53,newOpps:14,expOpps:8, newWonAmt:470,expWonAmt:180,newLostAmt:340,expLostAmt:120},
  {p:"Apr'25",newRate:31,expRate:60,newOpps:16,expOpps:8, newWonAmt:660,expWonAmt:260,newLostAmt:280,expLostAmt:0},
  {p:"May'25",newRate:29,expRate:58,newOpps:17,expOpps:9, newWonAmt:720,expWonAmt:330,newLostAmt:380,expLostAmt:0},
  {p:"Jun'25",newRate:30,expRate:55,newOpps:19,expOpps:10,newWonAmt:800,expWonAmt:320,newLostAmt:290,expLostAmt:0},
  {p:"Jul'25",newRate:22,expRate:50,newOpps:7, expOpps:3, newWonAmt:185,expWonAmt:60, newLostAmt:0,  expLostAmt:0},
];
const CONV_Q=[
  {p:"Q1'24",newRate:30,expRate:54,newOpps:51,expOpps:26,newWonAmt:1580,expWonAmt:560,newLostAmt:680,expLostAmt:0},
  {p:"Q2'24",newRate:32,expRate:57,newOpps:54,expOpps:28,newWonAmt:1680,expWonAmt:600,newLostAmt:720,expLostAmt:0},
  {p:"Q3'24",newRate:33,expRate:58,newOpps:56,expOpps:29,newWonAmt:1820,expWonAmt:630,newLostAmt:650,expLostAmt:0},
  {p:"Q4'24",newRate:35,expRate:62,newOpps:66,expOpps:33,newWonAmt:2100,expWonAmt:620,newLostAmt:580,expLostAmt:0},
  {p:"Q1'25",newRate:27,expRate:54,newOpps:51,expOpps:27,newWonAmt:1360,expWonAmt:460,newLostAmt:870,expLostAmt:120},
  {p:"Q2'25",newRate:28,expRate:57,newOpps:68,expOpps:35,newWonAmt:1930,expWonAmt:430,newLostAmt:910,expLostAmt:0},
  {p:"Q3'25",newRate:22,expRate:50,newOpps:20,expOpps:10,newWonAmt:505, expWonAmt:230,newLostAmt:0,  expLostAmt:0},
];
const CONV_W=Array.from({length:13},(_,i)=>({p:`W${i+15}`,newRate:[30,26,34,29,28,36,25,31,27,30,29,31,22][i],expRate:[51,49,57,53,52,63,47,55,51,57,56,54,48][i],newOpps:[4,3,5,4,3,6,3,5,3,3,5,5,3][i],expOpps:[2,2,2,2,2,2,2,2,2,2,2,2,1][i],newWonAmt:[185,0,240,180,0,310,0,220,0,195,265,200,0][i],expWonAmt:[100,0,100,80,0,110,0,90,0,95,100,85,0][i],newLostAmt:[80,120,0,95,140,0,110,0,85,0,95,0,60][i],expLostAmt:[0,0,0,0,0,0,0,0,0,0,0,0,0][i]}));

// ── FORECAST DATA ─────────────────────────────────────────────────────────────
const MFO=[
  {p:"Jul'24",commit:0.72,best:0.95,won:0.65,target:0.83,acc:90},
  {p:"Aug'24",commit:0.68,best:0.90,won:0.61,target:0.83,acc:90},
  {p:"Sep'24",commit:0.76,best:1.02,won:0.72,target:0.83,acc:95},
  {p:"Oct'24",commit:0.82,best:1.08,won:0.78,target:0.88,acc:95},
  {p:"Nov'24",commit:0.79,best:1.04,won:0.74,target:0.88,acc:94},
  {p:"Dec'24",commit:0.95,best:1.25,won:0.91,target:0.88,acc:96},
  {p:"Jan'25",commit:0.65,best:0.88,won:0.55,target:0.88,acc:85},
  {p:"Feb'25",commit:0.71,best:0.95,won:0.62,target:0.88,acc:87},
  {p:"Mar'25",commit:0.69,best:0.92,won:0.62,target:0.88,acc:90},
  {p:"Apr'25",commit:0.82,best:1.10,won:0.75,target:0.88,acc:91},
  {p:"May'25",commit:0.88,best:1.18,won:0.82,target:0.88,acc:93},
  {p:"Jun'25",commit:0.92,best:1.22,won:0.86,target:0.88,acc:93},
  {p:"Jul'25",commit:0.38,best:0.65,won:0.25,target:0.88,acc:66},
];
const QFO=[
  {p:"Q4'23",commit:2.1,best:2.8,won:1.92,target:2.5,acc:91},
  {p:"Q1'24",commit:2.3,best:3.1,won:2.14,target:2.5,acc:93},
  {p:"Q2'24",commit:2.4,best:3.0,won:2.28,target:2.5,acc:95},
  {p:"Q3'24",commit:2.6,best:3.2,won:2.45,target:2.5,acc:94},
  {p:"Q4'24",commit:2.8,best:3.4,won:2.72,target:2.63,acc:97},
  {p:"Q1'25",commit:2.5,best:3.2,won:1.82,target:2.63,acc:73},
  {p:"Q2'25",commit:2.7,best:3.4,won:2.36,target:2.63,acc:87},
  {p:"Q3'25",commit:2.63,best:3.8,won:1.08,target:2.63,acc:41},
];

// ── PIPELINE MOVEMENT ─────────────────────────────────────────────────────────
const PMOV={
  wow:[
    {label:'New Opps',sub:'4 deals added',value:'+$1.2M',delta:'+22% vs prior wk',pos:true},
    {label:'Stage Advances',sub:'6 deals moved forward',value:'+$0.85M',delta:'+31% vs prior wk',pos:true},
    {label:'New Commits',sub:'2 deals committed',value:'+$0.4M',delta:'+33% vs prior wk',pos:true},
    {label:'Lost / Slipped',sub:'1 deal (competitor win)',value:'-$0.3M',delta:'-33% vs prior wk',pos:false},
  ],
  dom:[
    {label:'New Opps',sub:'1 deal added',value:'+$285K',delta:'JPMorgan scope expand',pos:true},
    {label:'Stage Advances',sub:'2 deals advanced',value:'+$380K',delta:'Barclays → Negotiate',pos:true},
    {label:'New Commits',sub:'None today',value:'—',delta:'',pos:true},
    {label:'Lost / Slipped',sub:'None today',value:'—',delta:'',pos:true},
  ],
};

// ── GEO DATA (bPct, nPct, rep name for display) ───────────────────────────────
const GEO_D={
  all:{pipe:26800,opps:20,bPct:71,nPct:29,rep:'All Territories'},
  uk: {pipe:5200, opps:4, bPct:82,nPct:18,rep:'Sarah Chen (UK)'},
  mea:{pipe:3100, opps:3, bPct:55,nPct:45,rep:'James Okafor (MEA)'},
  apj:{pipe:4800, opps:3, bPct:76,nPct:24,rep:'Priya Nair (APJ)'},
  ca: {pipe:2600, opps:2, bPct:65,nPct:35,rep:'M.Torres (Canada)'},
  use:{pipe:6200, opps:4, bPct:68,nPct:32,rep:'Lisa Park (US-E)'},
  usw:{pipe:4900, opps:4, bPct:62,nPct:38,rep:'David Kim (US-W)'},
};

// ── KPI MATRIX — geo × period (commit/won/best change with period) ─────────────
const KPI_M={
  all:{Q:{won:1075,commit:2630,best:3800,tgt:2630,lbl:'Won QTD'},M:{won:245,commit:720,best:1050,tgt:880,lbl:'Won MTD'},W:{won:95,commit:285,best:420,tgt:220,lbl:'Won WTD'}},
  uk: {Q:{won:210,commit:510,best:740,tgt:510,lbl:'Won QTD'},M:{won:48,commit:140,best:205,tgt:170,lbl:'Won MTD'},W:{won:19,commit:55,best:82,tgt:68,lbl:'Won WTD'}},
  mea:{Q:{won:125,commit:305,best:440,tgt:305,lbl:'Won QTD'},M:{won:29,commit:84,best:122,tgt:102,lbl:'Won MTD'},W:{won:11,commit:33,best:49,tgt:41,lbl:'Won WTD'}},
  apj:{Q:{won:195,commit:470,best:685,tgt:470,lbl:'Won QTD'},M:{won:45,commit:129,best:189,tgt:157,lbl:'Won MTD'},W:{won:18,commit:51,best:75,tgt:63,lbl:'Won WTD'}},
  ca: {Q:{won:104,commit:255,best:370,tgt:255,lbl:'Won QTD'},M:{won:24,commit:70,best:102,tgt:85,lbl:'Won MTD'},W:{won:9,commit:28,best:41,tgt:34,lbl:'Won WTD'}},
  use:{Q:{won:248,commit:608,best:879,tgt:608,lbl:'Won QTD'},M:{won:57,commit:167,best:243,tgt:203,lbl:'Won MTD'},W:{won:22,commit:66,best:96,tgt:81,lbl:'Won WTD'}},
  usw:{Q:{won:193,commit:481,best:686,tgt:481,lbl:'Won QTD'},M:{won:44,commit:132,best:189,tgt:160,lbl:'Won MTD'},W:{won:17,commit:52,best:75,tgt:64,lbl:'Won WTD'}},
};

// ── PIPELINE STAGE — by period × new/exp (Q=active total, M/W=added that period) ─
const STAGE_P={
  Q:[{s:'Qualify',newVal:7380,expVal:820},{s:'Discovery',newVal:5780,expVal:1020},{s:'Demo',newVal:3420,expVal:1080},{s:'Proposal',newVal:2870,expVal:1230},{s:'Negotiate',newVal:2240,expVal:960}],
  M:[{s:'Qualify',newVal:1960,expVal:210},{s:'Discovery',newVal:1050,expVal:185},{s:'Demo',newVal:640,expVal:195},{s:'Proposal',newVal:510,expVal:220},{s:'Negotiate',newVal:370,expVal:165}],
  W:[{s:'Qualify',newVal:490,expVal:52},{s:'Discovery',newVal:262,expVal:46},{s:'Demo',newVal:160,expVal:49},{s:'Proposal',newVal:120,expVal:55},{s:'Negotiate',newVal:95,expVal:41}],
};

// ── SIGNALS DATA ──────────────────────────────────────────────────────────────
const DISC_TREND=[
  {p:"Q2'24",avg:8.2,banking:7.8,nonfs:9.1},
  {p:"Q3'24",avg:9.6,banking:9.1,nonfs:10.8},
  {p:"Q4'24",avg:10.8,banking:10.2,nonfs:12.1},
  {p:"Q1'25",avg:11.5,banking:10.8,nonfs:13.2},
  {p:"Q2'25",avg:12.4,banking:11.9,nonfs:14.1},
  {p:"Q3'25",avg:13.1,banking:12.3,nonfs:15.2},
];
const WIN_LOSS=[
  {s:'Partner',won:11,lost:3,wonAmt:2400,lostAmt:580},
  {s:'CS',won:9,lost:1,wonAmt:1900,lostAmt:180},
  {s:'Marketing',won:18,lost:8,wonAmt:3200,lostAmt:1800},
  {s:'Sales',won:14,lost:9,wonAmt:2800,lostAmt:2100},
];
const VELOCITY=[
  {label:'New Logo — Median Deal',val:'$485K',sub:'112-day cycle avg'},
  {label:'Expansion — Median Deal',val:'$320K',sub:'54-day cycle avg'},
  {label:'Banking/FS — Median Deal',val:'$540K',sub:'125-day cycle avg'},
  {label:'Non-FS — Median Deal',val:'$195K',sub:'68-day cycle avg'},
];
const SIGNALS=[
  {status:'red',title:'Discount Creep: 8.2% → 13.1% (6 Quarters)',metric:'+59% avg discount',body:'Average discount has risen 59% over six quarters. James Okafor (MEA) and David Kim (US-W) are primary drivers at 14.2% and 15.8% respectively. Without governance, this will compress blended margin and anchor customer price expectations.',action:"Implement deal desk approval for any discount >10%. Retroactively review Q2'25 closed deals for margin impact."},
  {status:'amber',title:'Pipeline Coverage: 2.68x — Below 3.0x Threshold',metric:'$7.2M gap to 3x',body:'Current pipeline of $26.8M against the $8.93M Q3 target yields 2.68x coverage — below the 3.0x floor for predictable forecasting. Non-FS exposure is particularly acute at 2.1x. Qualify-stage volume is 18% below same period prior year.',action:'Add $2.2M in qualified pipeline (Discovery+) by Week 29. Focus Non-FS prospecting for near-term coverage, Banking/FS for Q4.'},
  {status:'amber',title:'Expansion Motion Absent: 80% New Logo vs. 50/50 Target',metric:'5 of 6 reps: 0 expansion pipe',body:'80% of active pipeline is new logo. CS-sourced leads — the primary expansion signal — convert at 2x the rate of outbound, yet CS lead volume is the smallest source. Five of six reps carry zero expansion opportunities.',action:'Assign expansion pipeline quota (min $200K active) to Lisa Park, Priya Nair, and Sarah Chen starting Q4. Align CS on a joint list of 10 named expansion accounts.'},
  {status:'red',title:"Forecast Accuracy: Declining to 41% (from 97% Peak)",metric:"Q3'25: $1.08M of $2.63M commit",body:"Q3 is tracking at 41% forecast accuracy — a sharp drop from 91–97% historical norms. Pattern shows commits being booked at early pipeline stages. Rep-level review shows James Okafor and David Kim committing deals without full qualification evidence.",action:'Require Discovery-stage or higher for any commit. Add commit qualification gate to CRM. CRO to review commit list weekly through Aug 31.'},
];

// ── REP DATA (with geo field for filtering) ───────────────────────────────────
const REPP=[
  {n:'Sarah Chen',  t:'UK',    geo:'uk',  newL:8, expL:3,tot:11,conv:4,rate:36},
  {n:'James Okafor',t:'MEA',   geo:'mea', newL:5, expL:2,tot:7, conv:2,rate:29},
  {n:'Priya Nair',  t:'APJ',   geo:'apj', newL:9, expL:4,tot:13,conv:5,rate:38},
  {n:'M.Torres',    t:'Canada',geo:'ca',  newL:4, expL:2,tot:6, conv:2,rate:33},
  {n:'Lisa Park',   t:'US-E',  geo:'use', newL:10,expL:3,tot:13,conv:6,rate:46},
  {n:'David Kim',   t:'US-W',  geo:'usw', newL:6, expL:2,tot:8, conv:2,rate:25},
];

// ── DEAL DATA (with commit flag) ──────────────────────────────────────────────
const DEALS=[
  {id:1, opp:'Enterprise Collections Platform',customer:'JPMorgan Chase',src:'Partner',type:'New Logo',seg:'Banking/FS',geo:'use',partner:'Deloitte',owner:'Lisa Park',stage:'Negotiation',amount:850000,age:142,close:"Aug'25",forecast:'commit'},
  {id:2, opp:'Digital Recovery Suite',customer:'Wells Fargo',src:'Sales',type:'New Logo',seg:'Banking/FS',geo:'usw',partner:'',owner:'David Kim',stage:'Proposal',amount:620000,age:98,close:"Sep'25",forecast:'commit'},
  {id:3, opp:'Collections Modernization',customer:'Barclays Bank',src:'Partner',type:'New Logo',seg:'Banking/FS',geo:'uk',partner:'KPMG',owner:'Sarah Chen',stage:'Negotiation',amount:580000,age:118,close:"Aug'25",forecast:'commit'},
  {id:4, opp:'HSBC Recovery Platform',customer:'HSBC',src:'Partner',type:'New Logo',seg:'Banking/FS',geo:'uk',partner:'Accenture',owner:'Sarah Chen',stage:'Proposal',amount:720000,age:156,close:"Oct'25",forecast:'commit'},
  {id:5, opp:'Lloyds Expansion',customer:'Lloyds Banking Group',src:'CS',type:'Expansion',seg:'Banking/FS',geo:'uk',partner:'',owner:'Sarah Chen',stage:'Demo',amount:490000,age:67,close:"Sep'25",forecast:'bestcase'},
  {id:6, opp:'ANZ Digital Collections',customer:'ANZ Bank',src:'Marketing',type:'New Logo',seg:'Banking/FS',geo:'apj',partner:'PwC',owner:'Priya Nair',stage:'Demo',amount:410000,age:45,close:"Oct'25",forecast:'bestcase'},
  {id:7, opp:'Standard Chartered Recovery',customer:'Standard Chartered',src:'Sales',type:'New Logo',seg:'Banking/FS',geo:'apj',partner:'',owner:'Priya Nair',stage:'Discovery',amount:380000,age:32,close:"Nov'25",forecast:'pipeline'},
  {id:8, opp:'KeyBank Collections',customer:'KeyBank',src:'CS',type:'Expansion',seg:'Banking/FS',geo:'use',partner:'',owner:'Lisa Park',stage:'Negotiation',amount:285000,age:88,close:"Aug'25",forecast:'commit'},
  {id:9, opp:'Fifth Third Platform',customer:'Fifth Third Bank',src:'Marketing',type:'New Logo',seg:'Banking/FS',geo:'use',partner:'',owner:'Lisa Park',stage:'Proposal',amount:320000,age:74,close:"Sep'25",forecast:'bestcase'},
  {id:10,opp:'RBC Collections Suite',customer:'Royal Bank of Canada',src:'Partner',type:'New Logo',seg:'Banking/FS',geo:'ca',partner:'Deloitte',owner:'M.Torres',stage:'Discovery',amount:440000,age:28,close:"Nov'25",forecast:'pipeline'},
  {id:11,opp:'TD Collections Platform',customer:'TD Canada Trust',src:'Sales',type:'New Logo',seg:'Banking/FS',geo:'ca',partner:'',owner:'M.Torres',stage:'Discovery',amount:390000,age:41,close:"Nov'25",forecast:'pipeline'},
  {id:12,opp:'Ally Financial Recovery',customer:'Ally Financial',src:'Marketing',type:'New Logo',seg:'Non-FS',geo:'usw',partner:'',owner:'David Kim',stage:'Proposal',amount:245000,age:55,close:"Sep'25",forecast:'bestcase'},
  {id:13,opp:'Synchrony Expansion',customer:'Synchrony Financial',src:'CS',type:'Expansion',seg:'Non-FS',geo:'mea',partner:'',owner:'James Okafor',stage:'Demo',amount:195000,age:38,close:"Oct'25",forecast:'bestcase'},
  {id:14,opp:'Capita Debt Recovery',customer:'Capita Financial',src:'Marketing',type:'New Logo',seg:'Non-FS',geo:'uk',partner:'',owner:'Sarah Chen',stage:'Discovery',amount:180000,age:22,close:"Nov'25",forecast:'pipeline'},
  {id:15,opp:'Hoist Finance Platform',customer:'Hoist Finance',src:'Sales',type:'New Logo',seg:'Non-FS',geo:'mea',partner:'',owner:'James Okafor',stage:'Demo',amount:220000,age:51,close:"Oct'25",forecast:'bestcase'},
  {id:16,opp:'Encore Capital Suite',customer:'Encore Capital',src:'Marketing',type:'New Logo',seg:'Non-FS',geo:'usw',partner:'',owner:'David Kim',stage:'Qualify',amount:160000,age:14,close:"Nov'25",forecast:'pipeline'},
  {id:17,opp:'PRA Collections',customer:'PRA Group',src:'Partner',type:'New Logo',seg:'Non-FS',geo:'use',partner:'',owner:'Lisa Park',stage:'Qualify',amount:190000,age:18,close:"Nov'25",forecast:'pipeline'},
  {id:18,opp:'Arvato Collections',customer:'Arvato Financial',src:'Sales',type:'New Logo',seg:'Non-FS',geo:'mea',partner:'',owner:'James Okafor',stage:'Discovery',amount:145000,age:29,close:"Dec'25",forecast:'pipeline'},
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmtM=v=>Math.abs(v)>=1000?`$${(v/1000).toFixed(1)}M`:`$${v}K`;
const fmtA=v=>v>=1000000?`$${(v/1000000).toFixed(2)}M`:`$${(v/1000).toFixed(0)}K`;
const geoSf=g=>g==='all'?1:GEO_D[g].pipe/26800;
const SCOL={Qualify:'#C8E6E8',Discovery:'#7EC8CE',Demo:P.teal,Proposal:P.dk,Negotiation:P.navy};
const STXT={Qualify:P.gray,Discovery:P.gray,Demo:'white',Proposal:'white',Negotiation:'white'};
const GEO_OPTS=[['all','All Geos'],['uk','UK'],['mea','MEA'],['apj','APJ'],['ca','Canada'],['use','US-East'],['usw','US-West']];
const PER_LABEL={Q:'Q3 2025',M:"Jul '25",W:'Week 27'};
const PER_STAGE_TITLE={Q:'Active Pipeline by Stage',M:'New Pipeline Added — Jul 2025',W:'New Pipeline Added — Week 27'};

// ── SHARED ATOMS ──────────────────────────────────────────────────────────────
function Kpi({label,val,sub,badge,status}){
  const sc={green:{bg:'#E6F4E6',c:'#0A5C0A'},amber:{bg:'#FFF3CC',c:'#7A5200'},red:{bg:'#FDEAEA',c:'#7A1A1A'},n:{bg:P.bg,c:P.teal}};
  const vc={green:P.gn,amber:P.am,red:P.rd,n:P.navy};const s=status||'n';
  return <div style={{background:'white',border:`1px solid ${P.rule}`,borderTop:`3px solid ${P.navy}`,borderRadius:3,padding:'11px 14px'}}>
    <div style={{fontSize:9,fontWeight:600,color:P.mg,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:4}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:vc[s],lineHeight:1,marginBottom:4}}>{val}</div>
    <div style={{fontSize:10,color:P.mg,marginBottom:badge?5:0}}>{sub}</div>
    {badge&&<div style={{fontSize:9,padding:'2px 6px',borderRadius:2,background:sc[s].bg,color:sc[s].c,display:'inline-block',fontWeight:500}}>{badge}</div>}
  </div>;
}
function Chip({label,active,onClick}){return <button onClick={onClick} style={{fontSize:10,padding:'3px 9px',border:`1px solid ${active?P.navy:P.rule}`,borderRadius:3,background:active?P.navy:'white',color:active?'white':P.mg,cursor:'pointer',fontFamily:'inherit'}}>{label}</button>;}
function Filters({groups}){return <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center',marginBottom:12,paddingBottom:11,borderBottom:`1px solid ${P.rule}`}}>{groups.map(g=><div key={g.l} style={{display:'flex',alignItems:'center',gap:4}}><span style={{fontSize:9,fontWeight:600,color:P.mg,letterSpacing:'.05em'}}>{g.l}</span>{g.opts.map(([v,l])=><Chip key={v} label={l} active={g.val===v} onClick={()=>g.set(v)}/>)}</div>)}</div>;}
function CC({title,sub,h,children}){return <div style={{background:'white',border:`1px solid ${P.rule}`,borderRadius:3,padding:'13px 15px'}}><div style={{fontSize:12,fontWeight:600,color:P.navy,marginBottom:2}}>{title}</div>{sub&&<div style={{fontSize:9,color:P.mg,marginBottom:10}}>{sub}</div>}<ResponsiveContainer width="100%" height={h||200}>{children}</ResponsiveContainer></div>;}

function ConvTooltip({active,payload,label}){
  if(!active||!payload?.length) return null;
  const d=payload[0]?.payload;if(!d) return null;
  return <div style={{background:'white',border:`1px solid ${P.rule}`,borderRadius:3,padding:'10px 12px',fontSize:10,boxShadow:'0 2px 8px rgba(0,0,0,.12)',minWidth:230}}>
    <div style={{fontWeight:700,color:P.navy,marginBottom:7,borderBottom:`1px solid ${P.rule}`,paddingBottom:5}}>{label}</div>
    <div style={{marginBottom:6}}>
      <div style={{fontWeight:600,color:P.teal,marginBottom:2}}>New Logo — {d.newRate}% win rate</div>
      <div style={{color:P.gray}}>{d.newOpps} opps · <span style={{color:P.gn}}>+${d.newWonAmt}K won</span>{d.newLostAmt>0?<span style={{color:P.rd}}> · -${d.newLostAmt}K lost</span>:''}</div>
    </div>
    <div>
      <div style={{fontWeight:600,color:P.dk,marginBottom:2}}>Expansion — {d.expRate}% win rate</div>
      <div style={{color:P.gray}}>{d.expOpps} opps · <span style={{color:P.gn}}>+${d.expWonAmt}K won</span>{d.expLostAmt>0?<span style={{color:P.rd}}> · -${d.expLostAmt}K lost</span>:''}</div>
    </div>
  </div>;
}

// ── PULSE TAB ─────────────────────────────────────────────────────────────────
function Pulse({per,geo,mov}){
  const gd=GEO_D[geo];
  const kpi=KPI_M[geo][per];
  const sf=geoSf(geo);
  const stageData=STAGE_P[per].map(d=>({s:d.s,newVal:Math.round(d.newVal*sf),expVal:Math.round(d.expVal*sf)}));
  const mv=PMOV[mov];
  const attPct=Math.round(kpi.won/kpi.commit*100);
  const chartTitle=`${PER_STAGE_TITLE[per]} — New Logo vs Expansion`;
  const chartSub=per==='Q'?`Current snapshot · ${gd.rep}`:`Added this ${per==='M'?'month':'week'} · ${gd.rep}`;
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:12}}>
      <Kpi label={`Active Pipeline — ${PER_LABEL[per]}`} val={fmtM(gd.pipe)} sub={`${gd.opps} open opps · ${gd.rep}`}/>
      <Kpi label={`Committed — ${PER_LABEL[per]}`} val={fmtM(kpi.commit)} sub={`${per==='Q'?'Quarterly':'per-period'} rep commits`} status="amber" badge={`Target: ${fmtM(kpi.tgt)}`}/>
      <Kpi label={`Best Case — ${PER_LABEL[per]}`} val={fmtM(kpi.best)} sub="Upside scenario"/>
      <Kpi label={kpi.lbl} val={fmtM(kpi.won)} sub={`${attPct}% of commit`} status={attPct>=80?'green':attPct>=50?'amber':'red'} badge={`LTG: ${fmtM(kpi.commit-kpi.won)}`}/>
    </div>
    <div style={{fontSize:9,fontWeight:600,color:P.teal,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Pipeline Movement — {mov==='wow'?'Week over Week':'Day over Day'}</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
      {mv.map((m,i)=><div key={m.label} style={{background:'white',border:`1px solid ${P.rule}`,borderLeft:`3px solid ${i===3?P.rd:P.teal}`,borderRadius:3,padding:'10px 13px'}}>
        <div style={{fontSize:12,fontWeight:600,color:P.navy,marginBottom:2}}>{m.label}</div>
        <div style={{fontSize:9,color:P.mg,marginBottom:5}}>{m.sub}</div>
        <div style={{fontSize:18,fontWeight:700,color:m.value.startsWith('-')&&m.value!=='—'?P.rd:m.value==='—'?P.mg:P.gn,marginBottom:2}}>{m.value}</div>
        <div style={{fontSize:9,color:P.mg}}>{m.delta}</div>
      </div>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
      <CC title={chartTitle} sub={chartSub} h={185}>
        <BarChart data={stageData} layout="vertical" margin={{left:20,right:50,top:0,bottom:0}}>
          <XAxis type="number" tick={{fontSize:9}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/>
          <YAxis type="category" dataKey="s" tick={{fontSize:10}} width={58}/>
          <Tooltip formatter={(v,n)=>[fmtM(v),n]}/>
          <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
          <Bar dataKey="newVal" name="New Logo"  stackId="a" fill={P.teal} radius={0}/>
          <Bar dataKey="expVal" name="Expansion" stackId="a" fill={P.lt}   radius={[0,2,2,0]}/>
        </BarChart>
      </CC>
      <div style={{background:'white',border:`1px solid ${P.rule}`,borderRadius:3,padding:'13px 15px'}}>
        <div style={{fontSize:12,fontWeight:600,color:P.navy,marginBottom:2}}>Segment Mix — {gd.rep}</div>
        <div style={{fontSize:9,color:P.mg,marginBottom:10}}>Banking/FS vs Non-Financial Services</div>
        <div style={{display:'flex',height:24,borderRadius:3,overflow:'hidden',marginBottom:10}}>
          {gd.bPct>0&&<div style={{width:`${gd.bPct}%`,background:P.navy,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'white',fontWeight:600}}>{gd.bPct>25?`Banking/FS ${gd.bPct}%`:''}</div>}
          {gd.nPct>0&&<div style={{width:`${gd.nPct}%`,background:P.teal,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'white',fontWeight:600}}>{gd.nPct>25?`Non-FS ${gd.nPct}%`:''}</div>}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <div style={{background:P.lg,border:`1px solid ${P.rule}`,borderTop:`3px solid ${P.navy}`,borderRadius:3,padding:'9px 11px'}}>
            <div style={{fontSize:9,color:P.mg}}>Banking / FS</div>
            <div style={{fontSize:17,fontWeight:700,color:P.navy,marginTop:2}}>{fmtM(Math.round(gd.pipe*gd.bPct/100))}</div>
            <div style={{fontSize:9,color:P.mg,marginTop:2}}>{gd.bPct}% of pipe</div>
          </div>
          <div style={{background:P.lg,border:`1px solid ${P.rule}`,borderTop:`3px solid ${P.teal}`,borderRadius:3,padding:'9px 11px'}}>
            <div style={{fontSize:9,color:P.mg}}>Non-FS</div>
            <div style={{fontSize:17,fontWeight:700,color:P.teal,marginTop:2}}>{fmtM(Math.round(gd.pipe*gd.nPct/100))}</div>
            <div style={{fontSize:9,color:P.mg,marginTop:2}}>{gd.nPct}% of pipe</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

// ── FUNNEL TAB ────────────────────────────────────────────────────────────────
function FunnelTab({per,geo,src,setSrc}){
  const sf=geoSf(geo);
  const rawBase=per==='Q'?QFD:per==='W'?WFD:MFD;
  // Scale all funnel data by geo
  const raw=rawBase.map(d=>({...d,mkt:Math.round(d.mkt*sf),sales:Math.round(d.sales*sf),partner:Math.round(d.partner*sf),cs:Math.round(d.cs*sf),opps:Math.round(d.opps*sf),won:Math.round(d.won*sf),wonAmt:Math.round(d.wonAmt*sf)}));
  const fd=raw.map(d=>({...d,mkt:(src==='all'||src==='mkt')?d.mkt:0,sales:(src==='all'||src==='sales')?d.sales:0,partner:(src==='all'||src==='partner')?d.partner:0,cs:(src==='all'||src==='cs')?d.cs:0}));
  const tot=raw.reduce((a,d)=>({leads:a.leads+d.mkt+d.sales+d.partner+d.cs,opps:a.opps+d.opps,won:a.won+d.won}),{leads:0,opps:0,won:0});
  const sL=src==='all'?tot.leads:raw.reduce((a,d)=>a+(src==='mkt'?d.mkt:src==='sales'?d.sales:src==='partner'?d.partner:d.cs),0);
  const fs=[{l:'Leads',v:sL,col:P.teal},{l:'Opps Created',v:tot.opps,col:P.dk},{l:'Won',v:tot.won,col:P.gn}];
  // Conv rate trend scaled by geo
  const convBase=per==='Q'?CONV_Q:per==='W'?CONV_W:CONV_M;
  const convData=convBase.map(d=>({...d,newOpps:Math.round(d.newOpps*sf),expOpps:Math.round(d.expOpps*sf),newWonAmt:Math.round(d.newWonAmt*sf),expWonAmt:Math.round(d.expWonAmt*sf),newLostAmt:Math.round(d.newLostAmt*sf),expLostAmt:Math.round(d.expLostAmt*sf)}));
  // Rep table filtered by geo
  const reps=geo==='all'?REPP:REPP.filter(r=>r.geo===geo);
  const repData=reps.map(r=>geo==='all'?r:{...r,newL:Math.round(r.newL*sf*6),expL:Math.round(r.expL*sf*6),tot:Math.round(r.tot*sf*6),conv:Math.round(r.conv*sf*6)});
  const TH={background:P.navy,color:'white',padding:'6px 8px',fontSize:9,fontWeight:500,textAlign:'left',whiteSpace:'nowrap'};
  const TD={padding:'6px 8px',borderBottom:`1px solid #F0F0F0`,fontSize:11};
  const gd=GEO_D[geo];
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:10,marginBottom:10}}>
      <CC title="Leads Generated by Source" sub={`${per==='W'?'13 weeks':per==='Q'?'7 quarters':'13 months (YoY)'} · ${gd.rep}`} h={205}>
        <BarChart data={fd} margin={{top:0,right:10,left:-10,bottom:0}}>
          <XAxis dataKey="p" tick={{fontSize:9}}/><YAxis tick={{fontSize:9}}/>
          <Tooltip/><Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
          {(src==='all'||src==='mkt')&&<Bar dataKey="mkt" name="Marketing" stackId="s" fill={P.teal}/>}
          {(src==='all'||src==='sales')&&<Bar dataKey="sales" name="Sales" stackId="s" fill={P.navy}/>}
          {(src==='all'||src==='partner')&&<Bar dataKey="partner" name="Partner" stackId="s" fill={P.lt}/>}
          {(src==='all'||src==='cs')&&<Bar dataKey="cs" name="CS" stackId="s" fill={P.dk}/>}
        </BarChart>
      </CC>
      <div style={{background:'white',border:`1px solid ${P.rule}`,borderRadius:3,padding:'13px 15px'}}>
        <div style={{fontSize:12,fontWeight:600,color:P.navy,marginBottom:2}}>Conversion Funnel</div>
        <div style={{fontSize:9,color:P.mg,marginBottom:14}}>Period aggregate · {gd.rep}</div>
        {fs.map((s,i,arr)=><div key={s.l} style={{marginBottom:i<arr.length-1?12:0}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:3,fontSize:10}}>
            <span>{s.l}</span><span style={{color:P.navy,fontWeight:600}}>{s.v}</span>
          </div>
          <div style={{background:P.rule,borderRadius:2,height:18}}><div style={{width:`${fs[0].v>0?Math.round(s.v/fs[0].v*100):0}%`,background:s.col,height:18,borderRadius:2,minWidth:fs[0].v>0&&s.v>0?4:0}}/></div>
          {i<arr.length-1&&<div style={{textAlign:'right',fontSize:9,color:P.mg,marginTop:3}}>{fs[0].v>0?Math.round(arr[i+1].v/s.v*100):0}% convert →</div>}
        </div>)}
      </div>
    </div>
    <CC title="Win Rate Trend — New Logo vs Expansion" sub={`Hover for opp counts, closed-won, closed-lost · ${gd.rep}`} h={200}>
      <ComposedChart data={convData} margin={{top:4,right:20,left:-10,bottom:0}}>
        <CartesianGrid strokeDasharray="3 3" stroke={P.rule}/>
        <XAxis dataKey="p" tick={{fontSize:9}}/><YAxis tick={{fontSize:9}} domain={[0,80]} tickFormatter={v=>`${v}%`}/>
        <Tooltip content={<ConvTooltip/>}/>
        <Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
        <ReferenceLine y={30} stroke={P.am} strokeDasharray="4 3" strokeWidth={1} label={{value:'30% floor',fontSize:8,fill:P.am,position:'right'}}/>
        <Line type="monotone" dataKey="newRate" name="New Logo win rate"  stroke={P.teal} strokeWidth={2} dot={{r:3,fill:P.teal}}/>
        <Line type="monotone" dataKey="expRate" name="Expansion win rate" stroke={P.dk}   strokeWidth={2} dot={{r:3,fill:P.dk}} strokeDasharray="5 3"/>
      </ComposedChart>
    </CC>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:10}}>
      <CC title="New Opps Created vs Won" sub={`Count · ${gd.rep}`} h={170}>
        <ComposedChart data={raw} margin={{top:4,right:16,left:-10,bottom:0}}>
          <XAxis dataKey="p" tick={{fontSize:9}}/><YAxis yAxisId="l" tick={{fontSize:9}}/><YAxis yAxisId="r" orientation="right" tick={{fontSize:9}}/>
          <Tooltip/><Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
          <Bar yAxisId="l" dataKey="opps" name="New Opps" fill={P.teal} radius={2}/>
          <Line yAxisId="r" type="monotone" dataKey="won" name="Won" stroke={P.gn} strokeWidth={2} dot={{r:3,fill:P.gn}}/>
        </ComposedChart>
      </CC>
      <div style={{background:'white',border:`1px solid ${P.rule}`,borderRadius:3,padding:'13px 15px'}}>
        <div style={{fontSize:12,fontWeight:600,color:P.navy,marginBottom:2}}>Rep Prospecting — This Month</div>
        <div style={{fontSize:9,color:P.mg,marginBottom:8}}>New Logo vs Expansion leads · {gd.rep}</div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr>{['Rep','Terr.','New','Exp.','Total','→Opp','Rate'].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{REPP.filter(r=>geo==='all'||r.geo===geo).map(r=><tr key={r.n}>
            <td style={{...TD,fontWeight:600,color:P.navy}}>{r.n}</td>
            <td style={TD}>{r.t}</td><td style={TD}>{r.newL}</td><td style={TD}>{r.expL}</td>
            <td style={{...TD,fontWeight:600}}>{r.tot}</td><td style={TD}>{r.conv}</td>
            <td style={{...TD,fontWeight:600,color:r.rate>=40?P.gn:r.rate>=30?P.am:P.rd}}>{r.rate}%</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  </div>;
}

// ── FORECAST TAB ──────────────────────────────────────────────────────────────
function Forecast({per,geo}){
  const isQ=per==='Q'||per==='W';
  const sf=geoSf(geo);
  const gd=GEO_D[geo];
  const data=(isQ?QFO:MFO).map(d=>({...d,commit:+(d.commit*sf).toFixed(2),best:+(d.best*sf).toFixed(2),won:+(d.won*sf).toFixed(2),target:+(d.target*sf).toFixed(2)}));
  const cur=data[data.length-1];
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:12}}>
      <Kpi label={`CQ Commit — ${gd.rep}`} val={`$${cur.commit}M`} sub="Rep-submitted this quarter" status="amber" badge={`Target: $${cur.target}M`}/>
      <Kpi label="CQ Best Case" val={`$${cur.best}M`} sub="Upside scenario"/>
      <Kpi label="Won QTD" val={`$${cur.won}M`} sub={`${cur.acc}% forecast accuracy`} status={cur.acc>=80?'green':cur.acc>=60?'amber':'red'}/>
      <Kpi label="Remaining Gap" val={`$${(cur.commit-cur.won).toFixed(2)}M`} sub="Commit still needed" status={cur.commit-cur.won>0.5?'red':'amber'}/>
    </div>
    <CC title={isQ?"Quarterly Forecast — 2 Years Running (Q4'23–Q3'25)":"Monthly Forecast — 13 Months YoY (Jul'24–Jul'25)"} sub={`Commit · Best Case · Won · Target line · ${gd.rep}`} h={245}>
      <ComposedChart data={data} margin={{top:4,right:20,left:0,bottom:0}}>
        <CartesianGrid strokeDasharray="3 3" stroke={P.rule}/>
        <XAxis dataKey="p" tick={{fontSize:9}}/><YAxis tick={{fontSize:9}} tickFormatter={v=>`$${v}M`}/>
        <Tooltip formatter={(v,n)=>[`$${typeof v==='number'?v.toFixed(2):v}M`,n]}/><Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
        <Bar dataKey="commit" name="Commit"    fill={P.teal} radius={[2,2,0,0]}/>
        <Bar dataKey="best"   name="Best Case" fill={P.lt}   radius={[2,2,0,0]}/>
        <Bar dataKey="won"    name="Won"       fill={P.gn}   radius={[2,2,0,0]}/>
        <Line type="monotone" dataKey="target" name="Target" stroke={P.rd} strokeWidth={1.5} strokeDasharray="5 4" dot={false}/>
      </ComposedChart>
    </CC>
    <div style={{marginTop:10}}>
      <CC title="Forecast Accuracy by Period" sub="Won ÷ Commit · 80% target" h={135}>
        <BarChart data={data} margin={{top:4,right:20,left:0,bottom:0}}>
          <XAxis dataKey="p" tick={{fontSize:9}}/><YAxis tick={{fontSize:9}} domain={[0,105]} tickFormatter={v=>`${v}%`}/>
          <Tooltip formatter={v=>[`${v}%`,'Accuracy']}/>
          <ReferenceLine y={80} stroke={P.am} strokeDasharray="4 3" strokeWidth={1.5}/>
          <Bar dataKey="acc" name="Accuracy" fill={P.teal} radius={[2,2,0,0]}/>
        </BarChart>
      </CC>
    </div>
  </div>;
}

// ── DEAL LIST TAB ─────────────────────────────────────────────────────────────
function Deals(){
  const [stg,setStg]=useState('all');
  const [seg,setSeg]=useState('all');
  const [own,setOwn]=useState('all');
  const [src,setSrc]=useState('all');
  const [geo,setGeo]=useState('all');
  const [fcat,setFcat]=useState('all'); // commit | bestcase | pipeline
  const [sc,setSc]=useState('amount');
  const [sd,setSd]=useState(-1);
  const owners=['all',...[...new Set(DEALS.map(d=>d.owner))]];
  const rows=DEALS
    .filter(d=>stg==='all'||d.stage===stg)
    .filter(d=>seg==='all'||d.seg===seg)
    .filter(d=>own==='all'||d.owner===own)
    .filter(d=>src==='all'||d.src===src)
    .filter(d=>geo==='all'||d.geo===geo)
    .filter(d=>fcat==='all'||d.forecast===fcat)
    .sort((a,b)=>(a[sc]>b[sc]?1:-1)*sd);
  const tot=rows.reduce((a,d)=>a+d.amount,0);
  const commitTot=rows.filter(d=>d.forecast==='commit').reduce((a,d)=>a+d.amount,0);
  const bcTot=rows.filter(d=>d.forecast==='bestcase').reduce((a,d)=>a+d.amount,0);
  const sb=col=>{if(sc===col){setSd(d=>-d);}else{setSc(col);setSd(-1);}};
  const si=col=>sc===col?(sd>0?'↑':'↓'):'';
  const TH={background:P.navy,color:'white',padding:'7px 9px',fontSize:9,fontWeight:500,textAlign:'left',whiteSpace:'nowrap',cursor:'pointer',userSelect:'none'};
  const TD={padding:'7px 9px',borderBottom:`1px solid #F0F0F0`,fontSize:11,whiteSpace:'nowrap'};
  const sel={fontSize:10,padding:'3px 7px',border:`1px solid ${P.rule}`,borderRadius:3,color:P.gray,fontFamily:'inherit',background:'white'};
  const GEO_LABELS={all:'All',uk:'UK',mea:'MEA',apj:'APJ',ca:'Canada',use:'US-E',usw:'US-W'};
  return <div>
    <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',marginBottom:12,paddingBottom:11,borderBottom:`1px solid ${P.rule}`}}>
      {[
        ['FORECAST',[['all','All'],['commit','Commit'],['bestcase','Best Case'],['pipeline','Pipeline']],fcat,setFcat,v=>v],
        ['STAGE',   [['all','All'],['Qualify','Qualify'],['Discovery','Discovery'],['Demo','Demo'],['Proposal','Proposal'],['Negotiation','Negotiation']],stg,setStg,v=>v],
        ['SEGMENT', [['all','All'],['Banking/FS','Banking/FS'],['Non-FS','Non-FS']],seg,setSeg,v=>v],
        ['SOURCE',  [['all','All'],['Marketing','Marketing'],['Sales','Sales'],['Partner','Partner'],['CS','CS']],src,setSrc,v=>v],
        ['GEO',     [['all','All'],['uk','UK'],['mea','MEA'],['apj','APJ'],['ca','Canada'],['use','US-E'],['usw','US-W']],geo,setGeo,v=>GEO_LABELS[v]||v],
        ['OWNER',   [['all','All'],...owners.slice(1).map(o=>[o,o])],own,setOwn,v=>v],
      ].map(([l,opts,v,s,fmt])=>(
        <div key={l} style={{display:'flex',alignItems:'center',gap:4}}>
          <span style={{fontSize:9,fontWeight:600,color:l==='FORECAST'?P.teal:P.mg,letterSpacing:'.05em'}}>{l}</span>
          <select value={v} onChange={e=>s(e.target.value)} style={{...sel,...(l==='FORECAST'&&v==='commit'?{borderColor:P.gn,color:P.gn}:l==='FORECAST'&&v==='bestcase'?{borderColor:'#B87800',color:'#B87800'}:l==='FORECAST'&&v==='pipeline'?{borderColor:P.teal,color:P.teal}:{})}}>{opts.map(([ov,ol])=><option key={ov} value={ov}>{ol}</option>)}</select>
        </div>
      ))}
      <div style={{marginLeft:'auto',fontSize:10,color:P.mg}}>
        <span style={{fontWeight:600,color:P.navy}}>{rows.length} deals</span> · {fmtA(tot)}
        {fcat==='all'&&<span style={{marginLeft:8,color:P.gn}}>· {fmtA(commitTot)} commit</span>}
        {fcat==='all'&&<span style={{marginLeft:6,color:'#B87800'}}>· {fmtA(bcTot)} best case</span>}
      </div>
    </div>
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%',borderCollapse:'collapse',background:'white',border:`1px solid ${P.rule}`,borderRadius:3}}>
        <thead><tr>
          <th style={TH}>✓</th>
          {[['opp','Opportunity'],['customer','Customer'],['type','Type'],['seg','Segment'],['src','Source'],['partner','Partner'],['owner','Owner'],['stage','Stage'],['amount','Amount'],['age','Age'],['close','Close']].map(([c,l])=>(
            <th key={c} style={TH} onClick={()=>sb(c)}>{l} {si(c)}</th>
          ))}
        </tr></thead>
        <tbody>
          {rows.map(d=><tr key={d.id} onMouseEnter={e=>e.currentTarget.style.background=P.bg} onMouseLeave={e=>e.currentTarget.style.background='white'}>
            <td style={{...TD,textAlign:'center'}}>
              {d.forecast==='commit'  &&<span style={{color:P.gn,   fontWeight:700,fontSize:13}}>✓</span>}
              {d.forecast==='bestcase'&&<span style={{color:'#B87800',fontWeight:700,fontSize:13}}>◆</span>}
            </td>
            <td style={{...TD,fontWeight:600,color:d.forecast==='commit'?P.navy:d.forecast==='bestcase'?P.gray:P.mg,maxWidth:175,overflow:'hidden',textOverflow:'ellipsis'}}>{d.opp}</td>
            <td style={TD}>{d.customer}</td>
            <td style={{...TD,color:d.type==='New Logo'?P.teal:P.dk,fontWeight:500}}>{d.type}</td>
            <td style={{...TD,color:d.seg==='Banking/FS'?P.navy:P.teal,fontWeight:500}}>{d.seg}</td>
            <td style={{...TD,color:P.mg}}>{d.src}</td>
            <td style={{...TD,color:P.mg}}>{d.partner||'—'}</td>
            <td style={TD}>{d.owner}</td>
            <td style={TD}><span style={{background:SCOL[d.stage]||P.lg,color:STXT[d.stage]||P.gray,padding:'2px 6px',borderRadius:2,fontSize:9,fontWeight:600}}>{d.stage}</span></td>
            <td style={{...TD,fontWeight:600,color:P.navy}}>{fmtA(d.amount)}</td>
            <td style={{...TD,color:d.age>120?P.rd:d.age>90?P.am:P.gray}}>{d.age}d</td>
            <td style={TD}>{d.close}</td>
          </tr>)}
          <tr>
            <td colSpan={9} style={{...TD,fontWeight:600,color:P.mg,textAlign:'right',background:P.lg}}>TOTAL ({rows.length})</td>
            <td style={{...TD,fontWeight:700,color:P.navy,background:P.lg}}>{fmtA(tot)}</td>
            <td colSpan={2} style={{...TD,background:P.lg}}/>
          </tr>
        </tbody>
      </table>
    </div>
  </div>;
}

// ── SIGNALS TAB ───────────────────────────────────────────────────────────────
function Signals(){
  const statusStyle={red:{accent:P.rd,badge:{bg:'#F8C8C8',c:'#6B0000'}},amber:{accent:P.am,badge:{bg:'#FFE9A0',c:'#5A3A00'}}};
  return <div>
    <div style={{fontSize:9,fontWeight:600,color:P.mg,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:12}}>Revenue Intelligence Signals — Week 27, Q3 2025</div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
      {SIGNALS.map((s,i)=>{
        const st=statusStyle[s.status];
        return <div key={i} style={{background:'white',border:`1px solid ${P.rule}`,borderLeft:`4px solid ${st.accent}`,borderRadius:3,padding:'14px 16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
            <div style={{fontSize:13,fontWeight:600,color:P.navy,lineHeight:1.3,flex:1,marginRight:12}}>{s.title}</div>
            <div style={{fontSize:10,padding:'3px 8px',borderRadius:3,background:st.badge.bg,color:st.badge.c,fontWeight:600,whiteSpace:'nowrap'}}>{s.metric}</div>
          </div>
          <div style={{fontSize:11,color:P.gray,lineHeight:1.65,marginBottom:10}}>{s.body}</div>
          <div style={{background:P.bg,border:`1px solid ${P.rule}`,borderRadius:3,padding:'7px 10px',fontSize:10,color:P.teal}}>
            <span style={{fontWeight:600}}>Recommended action: </span>{s.action}
          </div>
        </div>;
      })}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
      <CC title="Discount Trend by Segment" sub="Avg % discount · 6-quarter view · 10% threshold line" h={200}>
        <ComposedChart data={DISC_TREND} margin={{top:4,right:20,left:-10,bottom:0}}>
          <CartesianGrid strokeDasharray="3 3" stroke={P.rule}/>
          <XAxis dataKey="p" tick={{fontSize:9}}/><YAxis tick={{fontSize:9}} tickFormatter={v=>`${v}%`}/>
          <Tooltip formatter={(v,n)=>[`${v}%`,n]}/><Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
          <ReferenceLine y={10} stroke={P.am} strokeDasharray="4 3" label={{value:'10%',fontSize:8,fill:P.am,position:'right'}}/>
          <Line type="monotone" dataKey="avg"     name="Blended Avg" stroke={P.navy} strokeWidth={2.5} dot={{r:4,fill:P.navy}}/>
          <Line type="monotone" dataKey="banking" name="Banking/FS"  stroke={P.teal} strokeWidth={1.5} dot={{r:3}} strokeDasharray="5 3"/>
          <Line type="monotone" dataKey="nonfs"   name="Non-FS"      stroke={P.rd}   strokeWidth={1.5} dot={{r:3}} strokeDasharray="5 3"/>
        </ComposedChart>
      </CC>
      <CC title="Win vs Lost by Lead Source — YTD" sub="Deal count by source" h={200}>
        <BarChart data={WIN_LOSS} margin={{top:4,right:20,left:-10,bottom:0}}>
          <XAxis dataKey="s" tick={{fontSize:10}}/><YAxis tick={{fontSize:9}}/>
          <Tooltip/><Legend iconSize={8} wrapperStyle={{fontSize:10}}/>
          <Bar dataKey="won"  name="Won"  fill={P.gn} radius={[2,2,0,0]}/>
          <Bar dataKey="lost" name="Lost" fill={P.rd} radius={[2,2,0,0]}/>
        </BarChart>
      </CC>
    </div>
    <div style={{fontSize:9,fontWeight:600,color:P.teal,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Deal Velocity Benchmarks</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
      {VELOCITY.map(v=><div key={v.label} style={{background:'white',border:`1px solid ${P.rule}`,borderTop:`3px solid ${P.teal}`,borderRadius:3,padding:'10px 12px'}}>
        <div style={{fontSize:9,color:P.mg,marginBottom:4}}>{v.label}</div>
        <div style={{fontSize:20,fontWeight:700,color:P.navy}}>{v.val}</div>
        <div style={{fontSize:9,color:P.mg,marginTop:2}}>{v.sub}</div>
      </div>)}
    </div>
  </div>;
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState('pulse');
  const [per,setPer]=useState('M');
  const [geo,setGeo]=useState('all');
  const [src,setSrc]=useState('all');
  const [mov,setMov]=useState('wow');
  const TABS=[['pulse','Pulse'],['funnel','Lead Funnel'],['forecast','Forecast'],['deals','Deal List'],['signals','Signals']];
  return <div style={{fontFamily:"'Calibri','Segoe UI',Arial,sans-serif",fontSize:13,color:P.gray,background:P.lg,minHeight:'100vh'}}>
    <div style={{background:P.navy,color:'white',padding:'11px 22px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><div style={{fontSize:15,fontWeight:600,marginBottom:2}}>C&R — Revenue Intelligence</div><div style={{fontSize:10,color:P.lt}}>Collections & Recovery · $10M ARR Target · 6-Rep Field Sales · W27, Q3 2025</div></div>
      <div style={{textAlign:'right'}}><div style={{fontSize:10,color:P.lt}}>Signal & Scale Advisory</div><div style={{fontSize:9,color:P.mg}}>Illustrative · Updates daily</div></div>
    </div>
    <div style={{background:'white',borderBottom:`1px solid ${P.rule}`,padding:'0 22px',display:'flex'}}>
      {TABS.map(([id,l])=><div key={id} onClick={()=>setTab(id)} style={{padding:'9px 16px',fontSize:12,fontWeight:500,cursor:'pointer',borderBottom:`2px solid ${tab===id?P.teal:'transparent'}`,color:tab===id?P.teal:P.mg}}>{l}</div>)}
    </div>
    <div style={{padding:'14px 22px'}}>
      {!['deals','signals'].includes(tab)&&<Filters groups={[
        {l:'PERIOD',opts:[['W','Weekly'],['M','Monthly'],['Q','Quarterly']],val:per,set:setPer},
        {l:'GEO',opts:GEO_OPTS,val:geo,set:setGeo},
        ...(tab==='pulse'?[{l:'MOVEMENT',opts:[['wow','Week/Week'],['dom','Day/Day']],val:mov,set:setMov}]:[]),
        ...(tab==='funnel'?[{l:'SOURCE',opts:[['all','All'],['mkt','Marketing'],['sales','Sales'],['partner','Partner'],['cs','CS']],val:src,set:setSrc}]:[]),
      ]}/>}
      {tab==='pulse'   &&<Pulse    per={per} geo={geo} mov={mov}/>}
      {tab==='funnel'  &&<FunnelTab per={per} geo={geo} src={src} setSrc={setSrc}/>}
      {tab==='forecast'&&<Forecast  per={per} geo={geo}/>}
      {tab==='deals'   &&<Deals/>}
      {tab==='signals' &&<Signals/>}
    </div>
  </div>;
}
