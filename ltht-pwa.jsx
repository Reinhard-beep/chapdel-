import { useState, useEffect, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════ */
const I = {
  Truck: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Package: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
  MapPin: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Nav: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  User: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  CheckCircle: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  XCircle: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>,
  Clock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Bar: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  Plus: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  ChevR: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevL: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Bell: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Upload: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  LogOut: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Menu: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Search: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Activity: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Eye: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Star: (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Dollar: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  ArrowR: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  File: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  X: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Phone: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Layers: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
};

/* ═══════════════════════════════════════════════════════════
   APP STATE / CONTEXT
═══════════════════════════════════════════════════════════ */
const Ctx = createContext(null);

const INIT_LOADS = [
  { id:"L001", owner:"Amina Saleh", pickup:"Dar es Salaam Port", dropoff:"Dodoma Central Market", cargo:"Electronics", weight:"2.5 tons", budget:"TZS 450,000", status:"open", posted:"2 hrs ago", dist:"450 km" },
  { id:"L002", owner:"John Mwangi", pickup:"Arusha Industrial Area", dropoff:"Mwanza Ferry Terminal", cargo:"Agricultural Produce", weight:"5 tons", budget:"TZS 780,000", status:"assigned", driver:"Peter Kimani", posted:"5 hrs ago", dist:"630 km" },
  { id:"L003", owner:"Fatuma Omar", pickup:"Tanga Port", dropoff:"Kolwezi, DRC", cargo:"Copper Ore Equipment", weight:"10 tons", budget:"TZS 2,200,000", status:"in_transit", driver:"Hassan Mwamba", posted:"1 day ago", dist:"1,800 km" },
  { id:"L004", owner:"David Mutua", pickup:"Kibaha Warehouse", dropoff:"Iringa Town", cargo:"Construction Materials", weight:"8 tons", budget:"TZS 950,000", status:"delivered", driver:"James Oloo", posted:"3 days ago", dist:"350 km" },
  { id:"L005", owner:"Amina Saleh", pickup:"Mbeya Depot", dropoff:"Lusaka, Zambia", cargo:"Consumer Goods", weight:"6 tons", budget:"TZS 1,500,000", status:"open", posted:"30 min ago", dist:"900 km" },
];
const INIT_DRIVERS = [
  { id:"D001", name:"Peter Kimani", phone:"+255 712 345 678", email:"peter@email.com", vehicle:"Isuzu FRR", plate:"T 123 DEF", capacity:"5 tons", status:"approved", trips:47, rating:4.8, loc:"Dar es Salaam" },
  { id:"D002", name:"Hassan Mwamba", phone:"+255 723 456 789", email:"hassan@email.com", vehicle:"MAN TGS 26", plate:"T 456 GHI", capacity:"15 tons", status:"pending", trips:0, rating:0, loc:"Arusha" },
  { id:"D003", name:"James Oloo", phone:"+255 734 567 890", email:"james@email.com", vehicle:"Mitsubishi Canter", plate:"T 789 JKL", capacity:"3 tons", status:"approved", trips:23, rating:4.6, loc:"Mwanza" },
  { id:"D004", name:"Rehema Ngugi", phone:"+255 745 678 901", email:"rehema@email.com", vehicle:"Scania P360", plate:"T 321 MNO", capacity:"20 tons", status:"pending", trips:0, rating:0, loc:"Tanga" },
];
const INIT_OWNERS = [
  { id:"C001", name:"Amina Saleh", phone:"+255 756 789 012", email:"amina@email.com", loads:12, status:"active" },
  { id:"C002", name:"John Mwangi", phone:"+255 767 890 123", email:"john@email.com", loads:8, status:"active" },
  { id:"C003", name:"Fatuma Omar", phone:"+255 778 901 234", email:"fatuma@email.com", loads:5, status:"active" },
  { id:"C004", name:"David Mutua", phone:"+255 789 012 345", email:"david@email.com", loads:3, status:"active" },
];

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loads, setLoads] = useState(INIT_LOADS);
  const [drivers, setDrivers] = useState(INIT_DRIVERS);
  const [notifs, setNotifs] = useState([
    { id:1, msg:"Load L001 has a new bid from Peter Kimani", read:false, time:"5 min ago" },
    { id:2, msg:"Load L003 status updated: In Transit", read:false, time:"1 hr ago" },
    { id:3, msg:"Load L004 delivered successfully!", read:true, time:"3 days ago" },
  ]);

  const login = (role, extra={}) => {
    const base = {
      cargo: { id:"C001", name:"Amina Saleh", email:"amina@ltht.co.tz", phone:"+255 756 789 012", role:"cargo" },
      driver: { id:"D001", name:"Peter Kimani", email:"peter@ltht.co.tz", phone:"+255 712 345 678", role:"driver", vehicle:"Isuzu FRR", plate:"T 123 DEF", capacity:"5 tons", status:"approved", trips:47, rating:4.8 },
      admin:  { id:"A001", name:"Super Admin", email:"admin@ltht.co.tz", role:"admin" },
    };
    setUser({ ...base[role], ...extra });
  };

  const logout = () => setUser(null);

  const postLoad = (d) => {
    const nl = { id:`L00${loads.length+1}`, owner:user?.name, ...d, status:"open", posted:"Just now" };
    setLoads(p => [nl, ...p]);
  };

  const acceptLoad = (id) => setLoads(p => p.map(l => l.id===id ? { ...l, status:"assigned", driver:user?.name } : l));

  const updateStatus = (id, status) => setLoads(p => p.map(l => l.id===id ? { ...l, status } : l));

  const approveDriver = (id) => setDrivers(p => p.map(d => d.id===id ? { ...d, status:"approved" } : d));

  const rejectDriver = (id, reason) => setDrivers(p => p.map(d => d.id===id ? { ...d, status:"rejected", rejectReason:reason } : d));

  const readNotif = (id) => setNotifs(p => p.map(n => n.id===id ? { ...n, read:true } : n));

  return (
    <Ctx.Provider value={{ user, login, logout, loads, drivers, owners:INIT_OWNERS, notifs, readNotif, postLoad, acceptLoad, updateStatus, approveDriver, rejectDriver }}>
      {children}
    </Ctx.Provider>
  );
}
const useCtx = () => useContext(Ctx);

/* ═══════════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════════ */
const Badge = ({ s }) => {
  const m = { open:["#DBEAFE","#1D4ED8","Open"], assigned:["#FEF3C7","#B45309","Assigned"], in_transit:["#EDE9FE","#7C3AED","In Transit"], arrived_pickup:["#FFEDD5","#C2410C","At Pickup"], delivered:["#D1FAE5","#065F46","Delivered"], pending:["#FEF3C7","#B45309","Pending KYC"], approved:["#D1FAE5","#065F46","Verified"], rejected:["#FEE2E2","#B91C1C","Rejected"], active:["#D1FAE5","#065F46","Active"], suspended:["#FEE2E2","#B91C1C","Suspended"] };
  const [bg, color, label] = m[s] || ["#F3F4F6","#6B7280", s];
  return <span style={{ background:bg, color, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:99 }}>{label}</span>;
};

const Inp = ({ label, type="text", val, set, ph, req, icon:Ic, textarea }) => (
  <div style={{ marginBottom:14 }}>
    {label && <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 }}>{label}{req && <span style={{ color:"#EF4444" }}> *</span>}</label>}
    <div style={{ position:"relative" }}>
      {Ic && <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#9CA3AF", pointerEvents:"none" }}><Ic width={15} height={15}/></div>}
      {textarea
        ? <textarea value={val} onChange={e=>set(e.target.value)} placeholder={ph} rows={3}
            style={{ width:"100%", border:"1.5px solid #E5E7EB", borderRadius:12, padding:"10px 14px", fontSize:13, background:"#F9FAFB", outline:"none", resize:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
        : <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph} required={req}
            style={{ width:"100%", border:"1.5px solid #E5E7EB", borderRadius:12, padding:"10px 14px", fontSize:13, background:"#F9FAFB", outline:"none", paddingLeft: Ic ? 36 : 14, boxSizing:"border-box" }} />
      }
    </div>
  </div>
);

const Sel = ({ label, val, set, opts, req }) => (
  <div style={{ marginBottom:14 }}>
    {label && <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 }}>{label}{req && <span style={{ color:"#EF4444" }}> *</span>}</label>}
    <select value={val} onChange={e=>set(e.target.value)} required={req}
      style={{ width:"100%", border:"1.5px solid #E5E7EB", borderRadius:12, padding:"10px 14px", fontSize:13, background:"#F9FAFB", outline:"none", appearance:"none" }}>
      <option value="">Select...</option>
      {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const Btn = ({ children, onClick, v="primary", cls="", disabled, type="button" }) => {
  const vs = {
    primary: { background:"#0A2540", color:"#fff" },
    secondary: { background:"#fff", color:"#0A2540", border:"1.5px solid #0A2540" },
    danger: { background:"#EF4444", color:"#fff" },
    success: { background:"#10B981", color:"#fff" },
    ghost: { background:"#F3F4F6", color:"#374151" },
    gold: { background:"#C8A96E", color:"#0A2540" },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, fontWeight:700, borderRadius:12, padding:"11px 18px", fontSize:13, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.5:1, transition:"all .15s", border:"none", ...vs[v], fontFamily:"inherit" }}
      className={cls}>
      {children}
    </button>
  );
};

const Card = ({ children, style={} }) => (
  <div style={{ background:"#fff", borderRadius:16, border:"1px solid #F3F4F6", boxShadow:"0 1px 4px rgba(0,0,0,.06)", ...style }}>{children}</div>
);

/* ═══════════════════════════════════════════════════════════
   MOCK MAP
═══════════════════════════════════════════════════════════ */
const Map = ({ h=220, route=false }) => {
  const cities = [
    { n:"Dar es Salaam", x:74, y:62 },
    { n:"Dodoma", x:51, y:48 },
    { n:"Arusha", x:54, y:27 },
    { n:"Mwanza", x:31, y:38 },
    { n:"Tanga", x:71, y:30 },
    { n:"Iringa", x:45, y:60 },
    { n:"Mbeya", x:33, y:72 },
  ];
  return (
    <div style={{ height:h, borderRadius:16, overflow:"hidden", background:"linear-gradient(135deg,#EFF6FF 0%,#F0FDF4 100%)", position:"relative", border:"1px solid #E5E7EB" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position:"absolute", inset:0 }}>
        {[20,35,50,65,80].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#BFDBFE" strokeWidth="0.4"/>)}
        {[20,35,50,65,80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#BFDBFE" strokeWidth="0.4"/>)}
        <path d="M30 18 L76 18 L87 34 L82 60 L76 76 L60 81 L44 76 L29 66 L24 44 L30 18Z" fill="rgba(14,165,233,0.07)" stroke="rgba(14,165,233,0.25)" strokeWidth="0.5"/>
        {route && <><line x1="74" y1="62" x2="51" y2="48" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2"/></>}
      </svg>
      {cities.map(c => (
        <div key={c.n} style={{ position:"absolute", left:`${c.x}%`, top:`${c.y}%`, transform:"translate(-50%,-50%)", textAlign:"center" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#0A2540", border:"1.5px solid #fff", margin:"0 auto", boxShadow:"0 1px 3px rgba(0,0,0,.2)" }} />
          <span style={{ fontSize:8, fontWeight:600, color:"#0A2540", whiteSpace:"nowrap", display:"block", marginTop:2 }}>{c.n}</span>
        </div>
      ))}
      {route && <>
        <div style={{ position:"absolute", left:"74%", top:"62%", transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"#10B981", border:"2px solid #fff", boxShadow:"0 0 0 4px rgba(16,185,129,.2)", animation:"pulse 2s infinite" }} />
        <div style={{ position:"absolute", left:"51%", top:"48%", transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"#EF4444", border:"2px solid #fff" }} />
      </>}
      <div style={{ position:"absolute", bottom:8, right:10, fontSize:9, color:"#9CA3AF", fontWeight:600, background:"rgba(255,255,255,.8)", padding:"2px 6px", borderRadius:6 }}>LTHT Maps</div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   LOAD CARD
═══════════════════════════════════════════════════════════ */
const LoadCard = ({ l, onClick, actions }) => (
  <Card style={{ marginBottom:10, cursor:"pointer" }}>
    <div onClick={onClick} style={{ padding:14 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, fontWeight:700, color:"#9CA3AF", fontFamily:"monospace" }}>#{l.id}</span>
          <span style={{ fontSize:13, fontWeight:700, color:"#0A2540" }}>{l.cargo}</span>
        </div>
        <Badge s={l.status}/>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#6B7280" }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#10B981", flexShrink:0 }} />{l.pickup}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#6B7280" }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#EF4444", flexShrink:0 }} />{l.dropoff}
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:11, color:"#9CA3AF" }}>{l.weight}{l.dist ? ` · ${l.dist}` : ""}</div>
        <span style={{ fontSize:13, fontWeight:800, color:"#0A2540" }}>{l.budget}</span>
      </div>
    </div>
    {actions && <div style={{ padding:"0 14px 14px" }}>{actions}</div>}
  </Card>
);

/* ═══════════════════════════════════════════════════════════
   LANDING
═══════════════════════════════════════════════════════════ */
function Landing({ go }) {
  return (
    <div style={{ minHeight:"100vh", background:"#0A2540", display:"flex", flexDirection:"column", fontFamily:"system-ui,sans-serif" }}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", textAlign:"center" }}>
        {/* Logo */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:12, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", borderRadius:20, padding:"14px 20px", marginBottom:28 }}>
          <I.Truck width={32} height={32} style={{ color:"#C8A96E" }}/>
          <div style={{ textAlign:"left" }}>
            <div style={{ color:"#fff", fontWeight:900, fontSize:26, lineHeight:1, letterSpacing:-1 }}>LTHT</div>
            <div style={{ color:"rgba(255,255,255,.45)", fontSize:10, fontWeight:600, letterSpacing:3, textTransform:"uppercase" }}>Tanzania</div>
          </div>
        </div>
        <h1 style={{ color:"#fff", fontSize:36, fontWeight:900, lineHeight:1.15, margin:"0 0 12px", letterSpacing:-1 }}>Logistics &amp;<br/>Transport Hub</h1>
        <p style={{ color:"rgba(255,255,255,.5)", fontSize:14, lineHeight:1.7, maxWidth:300, marginBottom:32 }}>
          Tanzania's premier freight-matching platform connecting cargo owners with trusted vehicle operators.
        </p>

        {/* Services */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, width:"100%", maxWidth:340, marginBottom:36 }}>
          {[["Truck Freight",I.Truck],["Sea Freight",I.Layers],["Air Freight",I.Activity]].map(([lbl,Ic]) => (
            <div key={lbl} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", borderRadius:16, padding:"14px 8px", textAlign:"center" }}>
              <Ic width={22} height={22} style={{ color:"#C8A96E", margin:"0 auto 6px" }}/>
              <div style={{ color:"rgba(255,255,255,.7)", fontSize:10, fontWeight:700 }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:10 }}>
          <button onClick={() => go("login")} style={{ width:"100%", background:"#C8A96E", color:"#0A2540", fontWeight:800, fontSize:15, padding:"15px", borderRadius:16, border:"none", cursor:"pointer" }}>
            Sign In to Your Account
          </button>
          <button onClick={() => go("register")} style={{ width:"100%", background:"rgba(255,255,255,.08)", color:"#fff", fontWeight:700, fontSize:15, padding:"15px", borderRadius:16, border:"1px solid rgba(255,255,255,.2)", cursor:"pointer" }}>
            Create New Account
          </button>
        </div>

        {/* Demo */}
        <div style={{ marginTop:32, width:"100%", maxWidth:340 }}>
          <div style={{ color:"rgba(255,255,255,.35)", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Quick Demo Access</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
            {[["cargo","Cargo Owner","#93C5FD"],["driver","Driver","#6EE7B7"],["admin","Admin","#FCD34D"]].map(([role,lbl,col]) => (
              <button key={role} onClick={() => go("app", role)}
                style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:12, padding:"10px 4px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:18 }}>{role==="cargo"?"📦":role==="driver"?"🚛":"🔐"}</span>
                <span style={{ fontSize:11, fontWeight:700, color:col }}>{lbl}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"0 0 20px", color:"rgba(255,255,255,.25)", fontSize:11 }}>
        © 2025 Logistics &amp; Transport Hub Tanzania · chapchapdel2023@gmail.com
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════════════════ */
function Login({ go }) {
  const { login } = useCtx();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email) { setErr("Please enter your email."); return; }
    setLoading(true); setErr("");
    await new Promise(r => setTimeout(r,800));
    if (email.includes("admin")) { login("admin"); go("app","admin"); }
    else if (email.includes("driver") || email.includes("peter")) { login("driver"); go("app","driver"); }
    else { login("cargo"); go("app","cargo"); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#F9FAFB", fontFamily:"system-ui,sans-serif" }}>
      {/* Header */}
      <div style={{ background:"#0A2540", padding:"40px 24px 32px" }}>
        <button onClick={() => go("landing")} style={{ color:"rgba(255,255,255,.5)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:13, marginBottom:20 }}>
          <I.ChevL width={16} height={16}/> Back
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <I.Truck width={22} height={22} style={{ color:"#C8A96E" }}/>
          <span style={{ color:"#fff", fontWeight:900, fontSize:18 }}>LTHT</span>
        </div>
        <h2 style={{ color:"#fff", fontWeight:800, fontSize:24, margin:0 }}>Welcome back</h2>
        <p style={{ color:"rgba(255,255,255,.45)", fontSize:13, margin:"4px 0 0" }}>Sign in to your account</p>
      </div>
      {/* Form */}
      <div style={{ padding:"28px 24px" }}>
        {err && <div style={{ background:"#FEE2E2", border:"1px solid #FECACA", color:"#B91C1C", borderRadius:12, padding:"10px 14px", fontSize:13, marginBottom:16 }}>{err}</div>}
        <Inp label="Email Address" type="email" val={email} set={setEmail} ph="you@example.com" req icon={I.User}/>
        <div style={{ marginBottom:20 }}>
          <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 }}>Password <span style={{ color:"#EF4444" }}>*</span></label>
          <div style={{ position:"relative" }}>
            <input type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)}
              placeholder="••••••••" style={{ width:"100%", border:"1.5px solid #E5E7EB", borderRadius:12, padding:"10px 40px 10px 14px", fontSize:13, background:"#F9FAFB", outline:"none", boxSizing:"border-box" }}/>
            <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#9CA3AF" }}>
              {showPw ? <I.EyeOff width={16} height={16}/> : <I.Eye width={16} height={16}/>}
            </button>
          </div>
        </div>
        <button onClick={submit} disabled={loading} style={{ width:"100%", background:"#0A2540", color:"#fff", fontWeight:700, fontSize:14, padding:"14px", borderRadius:14, border:"none", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:loading?.7:1 }}>
          {loading ? <><div style={{ width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 1s linear infinite" }}/> Signing in...</> : "Sign In"}
        </button>
        <div style={{ textAlign:"center", marginTop:20, fontSize:13 }}>
          <span style={{ color:"#6B7280" }}>No account? </span>
          <button onClick={()=>go("register")} style={{ color:"#0A2540", fontWeight:700, background:"none", border:"none", cursor:"pointer", fontSize:13 }}>Register here</button>
        </div>
        <div style={{ marginTop:24, background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:14, padding:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#1D4ED8", marginBottom:4 }}>Demo hint:</div>
          <div style={{ fontSize:11, color:"#3B82F6" }}>Email with "admin" → Admin Dashboard. Email with "driver" → Driver App. Any other email → Cargo Owner App.</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGISTER
═══════════════════════════════════════════════════════════ */
function Register({ go }) {
  const { login } = useCtx();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [vType, setVType] = useState(""); const [plate, setPlate] = useState(""); const [cap, setCap] = useState("");
  const [kyc, setKyc] = useState({ license:false, logbook:false });
  const [loading, setLoading] = useState(false);

  const finish = async () => {
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    login(role==="cargo"?"cargo":"driver", { name, email, phone, status: role==="driver" ? "pending" : undefined });
    go("app", role==="cargo"?"cargo":"driver");
  };

  const steps = role==="driver" ? 3 : 2;

  return (
    <div style={{ minHeight:"100vh", background:"#F9FAFB", fontFamily:"system-ui,sans-serif" }}>
      <div style={{ background:"#0A2540", padding:"40px 24px 28px" }}>
        <button onClick={() => step===1 ? go("landing") : setStep(s=>s-1)} style={{ color:"rgba(255,255,255,.5)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:13, marginBottom:18 }}>
          <I.ChevL width={16} height={16}/> {step===1?"Back":"Previous"}
        </button>
        <h2 style={{ color:"#fff", fontWeight:800, fontSize:22, margin:"0 0 4px" }}>Create Account</h2>
        <p style={{ color:"rgba(255,255,255,.4)", fontSize:12, margin:"0 0 14px" }}>Step {step} of {steps}</p>
        <div style={{ display:"flex", gap:6 }}>
          {Array.from({length:steps},(_,i)=>i+1).map(s => (
            <div key={s} style={{ flex:1, height:4, borderRadius:99, background: s<=step ? "#C8A96E" : "rgba(255,255,255,.15)", transition:"all .3s" }}/>
          ))}
        </div>
      </div>

      <div style={{ padding:"24px" }}>
        {step===1 && (
          <div>
            <h3 style={{ fontWeight:800, color:"#0A2540", fontSize:17, marginBottom:20 }}>I am a...</h3>
            {[
              { v:"cargo", emoji:"📦", title:"Cargo Owner (Mwenye Mzigo)", desc:"I need trucks to ship my goods", col:"#DBEAFE" },
              { v:"driver", emoji:"🚛", title:"Vehicle Owner (Mwenye Gari)", desc:"I have a truck and want to find loads", col:"#D1FAE5" },
            ].map(({ v, emoji, title, desc, col }) => (
              <button key={v} onClick={()=>{ setRole(v); setStep(2); }}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:14, padding:16, borderRadius:16, border:`2px solid ${role===v?"#0A2540":"#E5E7EB"}`, background:role===v?col:"#fff", marginBottom:12, cursor:"pointer", textAlign:"left" }}>
                <span style={{ fontSize:32 }}>{emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:"#0A2540", fontSize:13 }}>{title}</div>
                  <div style={{ color:"#9CA3AF", fontSize:12, marginTop:2 }}>{desc}</div>
                </div>
                <I.ChevR width={18} height={18} style={{ color:"#9CA3AF" }}/>
              </button>
            ))}
          </div>
        )}

        {step===2 && (
          <div>
            <h3 style={{ fontWeight:800, color:"#0A2540", fontSize:16, marginBottom:18 }}>Personal Information</h3>
            <Inp label="Full Name" val={name} set={setName} ph="e.g. Amina Saleh" req/>
            <Inp label="Phone Number" type="tel" val={phone} set={setPhone} ph="+255 7XX XXX XXX" req icon={I.Phone}/>
            <Inp label="Email Address" type="email" val={email} set={setEmail} ph="you@example.com" req icon={I.User}/>
            <Inp label="Password" type="password" val={pw} set={setPw} ph="Minimum 8 characters" req/>
            {role==="driver" && <>
              <Sel label="Vehicle Type" val={vType} set={setVType} req opts={[{v:"pickup",l:"Pickup Truck"},{v:"canter",l:"Canter (3–5 tons)"},{v:"heavy",l:"Heavy Truck (5–20 tons)"},{v:"tanker",l:"Tanker"},{v:"tipper",l:"Tipper Truck"}]}/>
              <Inp label="Plate Number" val={plate} set={setPlate} ph="T 123 ABC" req/>
              <Inp label="Carrying Capacity (tons)" type="number" val={cap} set={setCap} ph="e.g. 5" req/>
            </>}
            <button onClick={() => role==="cargo" ? finish() : setStep(3)}
              style={{ width:"100%", background:"#0A2540", color:"#fff", fontWeight:700, fontSize:14, padding:"14px", borderRadius:14, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {role==="cargo" ? (loading ? "Creating Account..." : "Create Account") : "Next: Upload Documents →"}
            </button>
          </div>
        )}

        {step===3 && role==="driver" && (
          <div>
            <h3 style={{ fontWeight:800, color:"#0A2540", fontSize:16, marginBottom:6 }}>KYC Document Upload</h3>
            <p style={{ color:"#6B7280", fontSize:13, marginBottom:20, lineHeight:1.6 }}>Upload verification documents. Your account will be reviewed within 24 hours.</p>
            {[{k:"license",label:"Driving License",desc:"Front & back of valid license"},{k:"logbook",label:"Vehicle Logbook",desc:"Official registration document"}].map(({k,label,desc}) => (
              <div key={k} style={{ border:`2px dashed ${kyc[k]?"#10B981":"#D1D5DB"}`, borderRadius:16, padding:18, textAlign:"center", marginBottom:14, background:kyc[k]?"#F0FDF4":"#F9FAFB", transition:"all .2s" }}>
                {kyc[k] ? (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, color:"#10B981", fontWeight:700, fontSize:13 }}>
                    <I.CheckCircle width={20} height={20}/> {label} — Uploaded ✓
                  </div>
                ) : (
                  <>
                    <I.Upload width={28} height={28} style={{ color:"#9CA3AF", margin:"0 auto 8px" }}/>
                    <div style={{ fontWeight:700, color:"#374151", fontSize:13 }}>{label}</div>
                    <div style={{ color:"#9CA3AF", fontSize:12, marginBottom:12 }}>{desc}</div>
                    <button onClick={()=>setKyc(p=>({...p,[k]:true}))} style={{ background:"#0A2540", color:"#fff", fontWeight:700, fontSize:12, padding:"8px 20px", borderRadius:10, border:"none", cursor:"pointer" }}>
                      Tap to Upload
                    </button>
                  </>
                )}
              </div>
            ))}
            <button onClick={finish} disabled={!kyc.license || !kyc.logbook || loading}
              style={{ width:"100%", background:"#0A2540", color:"#fff", fontWeight:700, fontSize:14, padding:"14px", borderRadius:14, border:"none", cursor:(!kyc.license||!kyc.logbook||loading)?"not-allowed":"pointer", opacity:(!kyc.license||!kyc.logbook)?0.5:1 }}>
              {loading ? "Submitting..." : "Submit for Verification →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CARGO OWNER APP
═══════════════════════════════════════════════════════════ */
function CargoApp() {
  const { user, loads, notifs, readNotif, postLoad, acceptLoad, logout } = useCtx();
  const [tab, setTab] = useState("home");
  const [showPost, setShowPost] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [detail, setDetail] = useState(null);
  const unread = notifs.filter(n=>!n.read).length;

  return (
    <div style={{ minHeight:"100vh", background:"#F3F4F6", fontFamily:"system-ui,sans-serif", maxWidth:480, margin:"0 auto", position:"relative" }}>
      {/* Header */}
      <div style={{ background:"#0A2540", padding:"36px 20px 18px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div>
            <div style={{ color:"rgba(255,255,255,.5)", fontSize:11, fontWeight:600 }}>Welcome back 👋</div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:19 }}>{user?.name?.split(" ")[0]}</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setShowNotifs(!showNotifs)} style={{ position:"relative", background:"rgba(255,255,255,.1)", border:"none", borderRadius:12, padding:9, cursor:"pointer" }}>
              <I.Bell width={20} height={20} style={{ color:"#fff" }}/>
              {unread>0 && <span style={{ position:"absolute", top:-4, right:-4, width:17, height:17, background:"#EF4444", borderRadius:"50%", fontSize:9, fontWeight:800, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>{unread}</span>}
            </button>
            <button onClick={logout} style={{ background:"rgba(255,255,255,.1)", border:"none", borderRadius:12, padding:9, cursor:"pointer" }}>
              <I.LogOut width={20} height={20} style={{ color:"#fff" }}/>
            </button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {[["Posted", loads.length,"#93C5FD"],["Active", loads.filter(l=>["assigned","in_transit","arrived_pickup"].includes(l.status)).length,"#FCD34D"],["Done", loads.filter(l=>l.status==="delivered").length,"#6EE7B7"]].map(([lbl,val,col]) => (
            <div key={lbl} style={{ background:"rgba(255,255,255,.1)", borderRadius:12, padding:"10px 0", textAlign:"center" }}>
              <div style={{ color:col, fontWeight:900, fontSize:20 }}>{val}</div>
              <div style={{ color:"rgba(255,255,255,.5)", fontSize:11 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notif panel */}
      {showNotifs && (
        <div style={{ background:"#fff", borderBottom:"1px solid #F3F4F6", padding:"14px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontWeight:800, color:"#0A2540", fontSize:14 }}>Notifications</span>
            <button onClick={()=>setShowNotifs(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA3AF" }}><I.X width={18} height={18}/></button>
          </div>
          {notifs.map(n => (
            <div key={n.id} onClick={()=>readNotif(n.id)} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:"1px solid #F9FAFB", cursor:"pointer", background:!n.read?"#EFF6FF":"transparent", margin:"0 -8px", padding:"8px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:n.read?"#D1D5DB":"#3B82F6", marginTop:5, flexShrink:0 }}/>
              <div><div style={{ fontSize:12, color:"#374151" }}>{n.msg}</div><div style={{ fontSize:10, color:"#9CA3AF", marginTop:2 }}>{n.time}</div></div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ padding:"16px 16px 90px" }}>
        {tab==="home" && <CargoHome loads={loads} onPost={()=>setShowPost(true)} onView={setDetail}/>}
        {tab==="loads" && <CargoLoads loads={loads} onView={setDetail}/>}
        {tab==="track" && <CargoTrack loads={loads}/>}
        {tab==="profile" && <CargoProfile user={user}/>}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"#fff", borderTop:"1px solid #F3F4F6", padding:"6px 8px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:4 }}>
        {[["home",I.Activity,"Home"],["loads",I.Package,"My Loads"],["track",I.MapPin,"Track"],["profile",I.User,"Profile"]].map(([id,Ic,lbl]) => (
          <button key={id} onClick={()=>setTab(id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"8px 4px", borderRadius:12, border:"none", background:tab===id?"#EFF6FF":"transparent", color:tab===id?"#0A2540":"#9CA3AF", cursor:"pointer" }}>
            <Ic width={22} height={22}/>
            <span style={{ fontSize:10, fontWeight:700, marginTop:3 }}>{lbl}</span>
          </button>
        ))}
      </div>

      {showPost && <PostModal onClose={()=>setShowPost(false)} onSubmit={(d)=>{ postLoad(d); setShowPost(false); }}/>}
      {detail && <DetailModal l={detail} role="cargo" onClose={()=>setDetail(null)}/>}
    </div>
  );
}

function CargoHome({ loads, onPost, onView }) {
  const active = loads.filter(l=>["assigned","in_transit","arrived_pickup"].includes(l.status));
  return (
    <div>
      {/* Post CTA */}
      <button onClick={onPost} style={{ width:"100%", background:"#0A2540", borderRadius:18, padding:16, display:"flex", alignItems:"center", gap:14, marginBottom:20, border:"none", cursor:"pointer", boxShadow:"0 8px 24px rgba(10,37,64,.25)" }}>
        <div style={{ background:"#C8A96E", borderRadius:12, padding:10, flexShrink:0 }}><I.Plus width={22} height={22} style={{ color:"#0A2540" }}/></div>
        <div style={{ textAlign:"left", flex:1 }}>
          <div style={{ color:"#fff", fontWeight:800, fontSize:15 }}>Post a New Load</div>
          <div style={{ color:"rgba(255,255,255,.5)", fontSize:12 }}>Find drivers for your cargo fast</div>
        </div>
        <I.ArrowR width={18} height={18} style={{ color:"#C8A96E" }}/>
      </button>

      {active.length>0 && <>
        <div style={{ fontWeight:800, color:"#0A2540", fontSize:15, marginBottom:10 }}>Active Trips</div>
        {active.map(l => <LoadCard key={l.id} l={l} onClick={()=>onView(l)}/>)}
      </>}

      <div style={{ fontWeight:800, color:"#0A2540", fontSize:15, margin:"16px 0 10px" }}>Recent Loads</div>
      {loads.slice(0,4).map(l => <LoadCard key={l.id} l={l} onClick={()=>onView(l)}/>)}
    </div>
  );
}

function CargoLoads({ loads, onView }) {
  const [f, setF] = useState("all");
  const filtered = loads.filter(l => {
    if(f==="all") return true;
    if(f==="active") return ["assigned","in_transit","arrived_pickup"].includes(l.status);
    return l.status===f;
  });
  return (
    <div>
      <div style={{ fontWeight:800, color:"#0A2540", fontSize:16, marginBottom:14 }}>My Loads</div>
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
        {[["all","All"],["open","Open"],["active","Active"],["delivered","Done"]].map(([id,lbl]) => (
          <button key={id} onClick={()=>setF(id)} style={{ flexShrink:0, padding:"7px 16px", borderRadius:99, fontSize:12, fontWeight:700, border:`1.5px solid ${f===id?"#0A2540":"#E5E7EB"}`, background:f===id?"#0A2540":"#fff", color:f===id?"#fff":"#6B7280", cursor:"pointer" }}>{lbl}</button>
        ))}
      </div>
      {filtered.length===0 ? <div style={{ textAlign:"center", padding:40, color:"#9CA3AF" }}>No loads found</div> : filtered.map(l=><LoadCard key={l.id} l={l} onClick={()=>onView(l)}/>)}
    </div>
  );
}

function CargoTrack({ loads }) {
  const active = loads.find(l=>l.status==="in_transit");
  return (
    <div>
      <div style={{ fontWeight:800, color:"#0A2540", fontSize:16, marginBottom:14 }}>Live Tracking</div>
      <Map h={240} route={!!active}/>
      {active ? (
        <div style={{ marginTop:14 }}>
          <Card style={{ padding:14, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontWeight:800, color:"#0A2540" }}>Load #{active.id}</span>
              <Badge s={active.status}/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", fontSize:13, color:"#374151" }}>
                <I.MapPin width={14} height={14} style={{ color:"#10B981" }}/>{active.pickup}
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center", fontSize:13, color:"#374151" }}>
                <I.MapPin width={14} height={14} style={{ color:"#EF4444" }}/>{active.dropoff}
              </div>
            </div>
            {active.driver && (
              <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid #F3F4F6", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:38, height:38, background:"#0A2540", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:15 }}>{active.driver.charAt(0)}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:"#0A2540", fontSize:13 }}>{active.driver}</div>
                  <div style={{ fontSize:11, color:"#9CA3AF" }}>Your Driver</div>
                </div>
                <button style={{ background:"#10B981", color:"#fff", fontWeight:700, fontSize:11, padding:"7px 14px", borderRadius:10, border:"none", cursor:"pointer" }}>📞 Call</button>
              </div>
            )}
          </Card>
          <Card style={{ padding:14 }}>
            <div style={{ fontWeight:800, color:"#0A2540", fontSize:13, marginBottom:12 }}>Trip Timeline</div>
            {[["Load Posted",true,"09:00"],["Driver Assigned",true,"09:45"],["Driver at Pickup",false,"—"],["In Transit",false,"—"],["Delivered",false,"—"]].map(([lbl,done,t],i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #F9FAFB" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:done?"#10B981":"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {done ? <I.Check width={12} height={12} style={{ color:"#fff" }}/> : <div style={{ width:7, height:7, borderRadius:"50%", background:"#D1D5DB" }}/>}
                </div>
                <span style={{ flex:1, fontSize:12, color:done?"#0A2540":"#9CA3AF", fontWeight:done?600:400 }}>{lbl}</span>
                <span style={{ fontSize:11, color:"#9CA3AF" }}>{t}</span>
              </div>
            ))}
          </Card>
        </div>
      ) : <div style={{ textAlign:"center", padding:40, color:"#9CA3AF", fontSize:13 }}>No active trips to track right now</div>}
    </div>
  );
}

function CargoProfile({ user }) {
  return (
    <div>
      <div style={{ textAlign:"center", padding:"24px 0 20px" }}>
        <div style={{ width:76, height:76, background:"#0A2540", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:26, margin:"0 auto 10px" }}>{user?.name?.charAt(0)}</div>
        <div style={{ fontWeight:800, color:"#0A2540", fontSize:19 }}>{user?.name}</div>
        <div style={{ marginTop:6 }}><Badge s="active"/></div>
      </div>
      <Card style={{ padding:4 }}>
        {[["Email",user?.email],["Phone",user?.phone],["Role","Cargo Owner (Mwenye Mzigo)"],["Member Since","June 2025"],["Total Loads Posted","5"]].map(([lbl,val]) => (
          <div key={lbl} style={{ display:"flex", justifyContent:"space-between", padding:"13px 16px", borderBottom:"1px solid #F9FAFB" }}>
            <span style={{ fontSize:13, color:"#6B7280" }}>{lbl}</span>
            <span style={{ fontSize:13, fontWeight:600, color:"#0A2540" }}>{val}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   POST LOAD MODAL
═══════════════════════════════════════════════════════════ */
function PostModal({ onClose, onSubmit }) {
  const [pickup, setPickup] = useState(""); const [dropoff, setDropoff] = useState(""); const [cargo, setCargo] = useState("");
  const [weight, setWeight] = useState(""); const [budget, setBudget] = useState(""); const [dist, setDist] = useState("");

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.55)", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"24px 24px 0 0", width:"100%", maxWidth:480, maxHeight:"92vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 20px 16px", borderBottom:"1px solid #F3F4F6", position:"sticky", top:0, background:"#fff", zIndex:10 }}>
          <span style={{ fontWeight:800, color:"#0A2540", fontSize:17 }}>Post New Load</span>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA3AF" }}><I.X width={22} height={22}/></button>
        </div>
        <div style={{ padding:"16px 20px 24px" }}>
          <Inp label="Pickup Location" val={pickup} set={setPickup} ph="e.g. Dar es Salaam Port" req icon={I.MapPin}/>
          <Inp label="Drop-off Location" val={dropoff} set={setDropoff} ph="e.g. Dodoma Market" req icon={I.Nav}/>
          <Sel label="Cargo Type" val={cargo} set={setCargo} req opts={[{v:"electronics",l:"Electronics"},{v:"agricultural",l:"Agricultural Produce"},{v:"construction",l:"Construction Materials"},{v:"industrial",l:"Industrial Equipment"},{v:"consumer",l:"Consumer Goods"},{v:"minerals",l:"Minerals / Ore"},{v:"petroleum",l:"Petroleum Products"},{v:"other",l:"Other"}]}/>
          <Inp label="Weight / Dimensions" val={weight} set={setWeight} ph="e.g. 2.5 tons / 3m × 2m" req/>
          <Inp label="Budget (TZS)" type="number" val={budget} set={setBudget} ph="e.g. 450000" req icon={I.Dollar}/>
          <Inp label="Estimated Distance" val={dist} set={setDist} ph="e.g. 450 km"/>
          <button onClick={()=>{ if(pickup&&dropoff&&cargo&&weight&&budget) onSubmit({ pickup, dropoff, cargo, weight, budget:`TZS ${parseInt(budget).toLocaleString()}`, dist }); }}
            style={{ width:"100%", background:"#0A2540", color:"#fff", fontWeight:700, fontSize:14, padding:"14px", borderRadius:14, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:4 }}>
            Post Load <I.ArrowR width={18} height={18}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOAD DETAIL MODAL
═══════════════════════════════════════════════════════════ */
function DetailModal({ l, role, onClose }) {
  const { acceptLoad, updateStatus } = useCtx();
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.55)", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"24px 24px 0 0", width:"100%", maxWidth:480, maxHeight:"92vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 20px 16px", borderBottom:"1px solid #F3F4F6", position:"sticky", top:0, background:"#fff" }}>
          <span style={{ fontWeight:800, color:"#0A2540", fontSize:16 }}>Load #{l.id}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA3AF" }}><I.X width={22} height={22}/></button>
        </div>
        <div style={{ padding:"16px 20px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}><Badge s={l.status}/><span style={{ fontSize:11, color:"#9CA3AF" }}>{l.posted}</span></div>
          <Map h={160} route/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"16px 0" }}>
            {[["Cargo",l.cargo],["Weight",l.weight],["Budget",l.budget],["Distance",l.dist||"N/A"]].map(([k,v])=>(
              <div key={k} style={{ background:"#F9FAFB", borderRadius:12, padding:"10px 12px" }}>
                <div style={{ fontSize:11, color:"#9CA3AF", marginBottom:3 }}>{k}</div>
                <div style={{ fontWeight:700, color:"#0A2540", fontSize:13 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Route</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <I.MapPin width={15} height={15} style={{ color:"#10B981", marginTop:2, flexShrink:0 }}/>
                <div><div style={{ fontSize:11, color:"#9CA3AF" }}>Pickup</div><div style={{ fontWeight:600, color:"#0A2540", fontSize:13 }}>{l.pickup}</div></div>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <I.MapPin width={15} height={15} style={{ color:"#EF4444", marginTop:2, flexShrink:0 }}/>
                <div><div style={{ fontSize:11, color:"#9CA3AF" }}>Drop-off</div><div style={{ fontWeight:600, color:"#0A2540", fontSize:13 }}>{l.dropoff}</div></div>
              </div>
            </div>
          </div>
          {l.driver && (
            <div style={{ background:"#EFF6FF", borderRadius:16, padding:14, display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:42, height:42, background:"#0A2540", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:16 }}>{l.driver.charAt(0)}</div>
              <div><div style={{ fontWeight:700, color:"#0A2540", fontSize:13 }}>{l.driver}</div><div style={{ fontSize:11, color:"#6B7280" }}>Assigned Driver</div></div>
            </div>
          )}
          {role==="driver" && <>
            {l.status==="open" && <Btn v="success" cls="w-full" onClick={()=>{ acceptLoad(l.id); onClose(); }} style={{ width:"100%" }}>✓ Accept This Load</Btn>}
            {l.status==="assigned" && <Btn v="primary" onClick={()=>{ updateStatus(l.id,"arrived_pickup"); onClose(); }} style={{ width:"100%" }}>📍 Mark: Arrived at Pickup</Btn>}
            {l.status==="arrived_pickup" && <Btn v="primary" onClick={()=>{ updateStatus(l.id,"in_transit"); onClose(); }} style={{ width:"100%" }}>🚛 Start Transit</Btn>}
            {l.status==="in_transit" && <Btn v="success" onClick={()=>{ updateStatus(l.id,"delivered"); onClose(); }} style={{ width:"100%" }}>✅ Mark as Delivered</Btn>}
          </>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DRIVER APP
═══════════════════════════════════════════════════════════ */
function DriverApp() {
  const { user, loads, acceptLoad, updateStatus, logout } = useCtx();
  const [tab, setTab] = useState("home");
  const [detail, setDetail] = useState(null);

  if (user?.status==="pending") return <DriverPending logout={logout}/>;

  const available = loads.filter(l=>l.status==="open");
  const myJobs = loads.filter(l=>l.driver===user?.name);
  const active = myJobs.filter(l=>l.status!=="delivered");
  const done = myJobs.filter(l=>l.status==="delivered");

  return (
    <div style={{ minHeight:"100vh", background:"#F3F4F6", fontFamily:"system-ui,sans-serif", maxWidth:480, margin:"0 auto" }}>
      <div style={{ background:"#0A2540", padding:"36px 20px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ color:"rgba(255,255,255,.5)", fontSize:11, fontWeight:600 }}>Driver Dashboard</div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:19 }}>{user?.name?.split(" ")[0]}</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ background:"#10B981", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:99 }}>● Online</div>
            <button onClick={logout} style={{ background:"rgba(255,255,255,.1)", border:"none", borderRadius:12, padding:9, cursor:"pointer" }}>
              <I.LogOut width={20} height={20} style={{ color:"#fff" }}/>
            </button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {[["Available",available.length,"#93C5FD"],["Active",active.length,"#FCD34D"],["Done",done.length,"#6EE7B7"]].map(([lbl,val,col])=>(
            <div key={lbl} style={{ background:"rgba(255,255,255,.1)", borderRadius:12, padding:"10px 0", textAlign:"center" }}>
              <div style={{ color:col, fontWeight:900, fontSize:20 }}>{val}</div>
              <div style={{ color:"rgba(255,255,255,.5)", fontSize:11 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"16px 16px 90px" }}>
        {tab==="home" && (
          <div>
            <div style={{ fontWeight:800, color:"#0A2540", fontSize:15, marginBottom:12 }}>Available Loads Near You</div>
            <Map h={200}/>
            <div style={{ marginTop:14 }}>
              {available.length===0 ? <div style={{ textAlign:"center", padding:32, color:"#9CA3AF" }}>No available loads right now</div>
                : available.map(l=>(
                  <LoadCard key={l.id} l={l} onClick={()=>setDetail(l)}
                    actions={<button onClick={(e)=>{ e.stopPropagation(); acceptLoad(l.id); }} style={{ width:"100%", background:"#10B981", color:"#fff", fontWeight:700, fontSize:13, padding:"11px", borderRadius:11, border:"none", cursor:"pointer" }}>✓ Accept This Load</button>}
                  />
                ))
              }
            </div>
          </div>
        )}
        {tab==="jobs" && (
          <div>
            <div style={{ fontWeight:800, color:"#0A2540", fontSize:15, marginBottom:12 }}>Active Jobs</div>
            {active.length===0 ? <div style={{ textAlign:"center", padding:32, color:"#9CA3AF" }}>No active jobs</div>
              : active.map(l=>(
                <LoadCard key={l.id} l={l} onClick={()=>setDetail(l)}
                  actions={
                    <div style={{ display:"flex", gap:8 }}>
                      {l.status==="assigned" && <button onClick={()=>updateStatus(l.id,"arrived_pickup")} style={{ flex:1, background:"#F59E0B", color:"#fff", fontWeight:700, fontSize:12, padding:"10px", borderRadius:10, border:"none", cursor:"pointer" }}>📍 Arrived at Pickup</button>}
                      {l.status==="arrived_pickup" && <button onClick={()=>updateStatus(l.id,"in_transit")} style={{ flex:1, background:"#0A2540", color:"#fff", fontWeight:700, fontSize:12, padding:"10px", borderRadius:10, border:"none", cursor:"pointer" }}>🚛 Start Transit</button>}
                      {l.status==="in_transit" && <button onClick={()=>updateStatus(l.id,"delivered")} style={{ flex:1, background:"#10B981", color:"#fff", fontWeight:700, fontSize:12, padding:"10px", borderRadius:10, border:"none", cursor:"pointer" }}>✅ Mark Delivered</button>}
                    </div>
                  }
                />
              ))
            }
          </div>
        )}
        {tab==="history" && (
          <div>
            <div style={{ fontWeight:800, color:"#0A2540", fontSize:15, marginBottom:12 }}>Completed Trips</div>
            {done.length===0 ? <div style={{ textAlign:"center", padding:32, color:"#9CA3AF" }}>No completed trips yet</div> : done.map(l=><LoadCard key={l.id} l={l} onClick={()=>setDetail(l)}/>)}
          </div>
        )}
        {tab==="profile" && <DriverProfile user={user}/>}
      </div>

      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"#fff", borderTop:"1px solid #F3F4F6", padding:"6px 8px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:4 }}>
        {[["home",I.MapPin,"Find Loads"],["jobs",I.Truck,"My Jobs"],["history",I.Clock,"History"],["profile",I.User,"Profile"]].map(([id,Ic,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"8px 4px", borderRadius:12, border:"none", background:tab===id?"#EFF6FF":"transparent", color:tab===id?"#0A2540":"#9CA3AF", cursor:"pointer" }}>
            <Ic width={22} height={22}/><span style={{ fontSize:10, fontWeight:700, marginTop:3 }}>{lbl}</span>
          </button>
        ))}
      </div>
      {detail && <DetailModal l={detail} role="driver" onClose={()=>setDetail(null)}/>}
    </div>
  );
}

function DriverPending({ logout }) {
  return (
    <div style={{ minHeight:"100vh", background:"#F9FAFB", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", fontFamily:"system-ui,sans-serif", maxWidth:400, margin:"0 auto" }}>
      <div style={{ width:80, height:80, background:"#FEF3C7", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
        <I.Clock width={36} height={36} style={{ color:"#F59E0B" }}/>
      </div>
      <h2 style={{ fontWeight:900, color:"#0A2540", fontSize:22, marginBottom:8 }}>Account Under Review</h2>
      <p style={{ color:"#6B7280", fontSize:14, lineHeight:1.7, marginBottom:24 }}>Your KYC documents are submitted and under review. You'll receive a notification within 24 hours.</p>
      <Card style={{ padding:16, width:"100%", marginBottom:24 }}>
        <div style={{ fontWeight:800, color:"#0A2540", fontSize:13, marginBottom:12 }}>Verification Checklist</div>
        {[["Documents Submitted",true],["Identity Verification",false],["Vehicle Background Check",false],["Account Activation",false]].map(([lbl,done],i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid #F9FAFB" }}>
            <div style={{ width:22, height:22, borderRadius:"50%", background:done?"#10B981":"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {done ? <I.Check width={11} height={11} style={{ color:"#fff" }}/> : <div style={{ width:7,height:7,borderRadius:"50%",background:"#D1D5DB" }}/>}
            </div>
            <span style={{ fontSize:13, color:done?"#0A2540":"#9CA3AF", fontWeight:done?600:400 }}>{lbl}</span>
          </div>
        ))}
      </Card>
      <Btn v="ghost" onClick={logout} cls="w-full">Sign Out</Btn>
    </div>
  );
}

function DriverProfile({ user }) {
  return (
    <div>
      <div style={{ textAlign:"center", padding:"24px 0 20px" }}>
        <div style={{ width:76, height:76, background:"#0A2540", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:26, margin:"0 auto 10px" }}>{user?.name?.charAt(0)}</div>
        <div style={{ fontWeight:800, color:"#0A2540", fontSize:19 }}>{user?.name}</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, margin:"4px 0 8px" }}>
          <I.Star width={14} height={14} style={{ color:"#F59E0B" }}/><span style={{ fontWeight:700, fontSize:13 }}>4.8</span><span style={{ color:"#9CA3AF", fontSize:12 }}>(47 trips)</span>
        </div>
        <Badge s="approved"/>
      </div>
      <Card style={{ padding:4, marginBottom:14 }}>
        {[["Vehicle",user?.vehicle||"Isuzu FRR"],["Plate",user?.plate||"T 123 DEF"],["Capacity",user?.capacity||"5 tons"],["Phone",user?.phone],["Email",user?.email]].map(([k,v])=>(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"13px 16px", borderBottom:"1px solid #F9FAFB" }}>
            <span style={{ fontSize:13, color:"#6B7280" }}>{k}</span>
            <span style={{ fontSize:13, fontWeight:600, color:"#0A2540" }}>{v}</span>
          </div>
        ))}
      </Card>
      <div style={{ background:"#D1FAE5", border:"1px solid #A7F3D0", borderRadius:14, padding:14, display:"flex", alignItems:"center", gap:12 }}>
        <I.Shield width={24} height={24} style={{ color:"#10B981" }}/>
        <div><div style={{ fontWeight:700, color:"#065F46", fontSize:13 }}>KYC Verified</div><div style={{ color:"#10B981", fontSize:12 }}>Documents approved by LTHT Admin</div></div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADMIN APP
═══════════════════════════════════════════════════════════ */
function AdminApp() {
  const { user, loads, drivers, owners, approveDriver, rejectDriver, logout } = useCtx();
  const [tab, setTab] = useState("overview");
  const [sidebar, setSidebar] = useState(true);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [search, setSearch] = useState("");

  const pending = drivers.filter(d=>d.status==="pending");

  const nav = [
    { id:"overview", Ic:I.Bar, lbl:"Overview" },
    { id:"kyc", Ic:I.File, lbl:`KYC Queue${pending.length?` (${pending.length})`:""}` },
    { id:"drivers", Ic:I.Truck, lbl:"Drivers" },
    { id:"owners", Ic:I.User, lbl:"Cargo Owners" },
    { id:"trips", Ic:I.Nav, lbl:"All Trips" },
  ];

  const stats = [
    { lbl:"Total Users", val:drivers.length+owners.length, Ic:I.User, bg:"#3B82F6", change:"+12%" },
    { lbl:"Verified Drivers", val:drivers.filter(d=>d.status==="approved").length, Ic:I.Shield, bg:"#10B981", change:"+5%" },
    { lbl:"Active Trips", val:loads.filter(l=>["assigned","in_transit","arrived_pickup"].includes(l.status)).length, Ic:I.Activity, bg:"#8B5CF6", change:"+3" },
    { lbl:"Completed", val:loads.filter(l=>l.status==="delivered").length, Ic:I.CheckCircle, bg:"#F59E0B", change:"+8%" },
    { lbl:"Open Loads", val:loads.filter(l=>l.status==="open").length, Ic:I.Package, bg:"#06B6D4", change:"today" },
    { lbl:"Pending KYC", val:pending.length, Ic:I.Clock, bg:"#EF4444", change:"urgent" },
  ];

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"system-ui,sans-serif", background:"#F3F4F6" }}>
      {/* Sidebar */}
      <div style={{ width:sidebar?220:56, background:"#0A2540", display:"flex", flexDirection:"column", minHeight:"100vh", transition:"width .2s", flexShrink:0 }}>
        <div style={{ padding:"16px 12px", borderBottom:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ background:"#C8A96E", borderRadius:10, padding:8, flexShrink:0 }}><I.Truck width={18} height={18} style={{ color:"#0A2540" }}/></div>
          {sidebar && <div><div style={{ color:"#fff", fontWeight:900, fontSize:15, lineHeight:1 }}>LTHT</div><div style={{ color:"rgba(255,255,255,.35)", fontSize:9, letterSpacing:2 }}>ADMIN</div></div>}
          <button onClick={()=>setSidebar(!sidebar)} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.3)", display:"none", outline:"none" }} className="md-show">
            <I.Menu width={16} height={16}/>
          </button>
        </div>
        <nav style={{ flex:1, padding:"10px 8px" }}>
          {nav.map(({ id, Ic, lbl }) => (
            <button key={id} onClick={()=>setTab(id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 10px", borderRadius:10, border:"none", background:tab===id?"rgba(255,255,255,.12)":"transparent", color:tab===id?"#fff":"rgba(255,255,255,.45)", cursor:"pointer", marginBottom:3, textAlign:"left", transition:"all .15s" }}>
              <Ic width={17} height={17} style={{ flexShrink:0 }}/>
              {sidebar && <span style={{ fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{lbl}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:"10px 8px 16px", borderTop:"1px solid rgba(255,255,255,.08)" }}>
          {sidebar && <div style={{ padding:"6px 10px 10px" }}>
            <div style={{ color:"#fff", fontWeight:700, fontSize:13 }}>{user?.name}</div>
            <div style={{ color:"rgba(255,255,255,.35)", fontSize:11 }}>{user?.email}</div>
          </div>}
          <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px", borderRadius:10, border:"none", background:"transparent", color:"rgba(255,255,255,.4)", cursor:"pointer" }}>
            <I.LogOut width={17} height={17}/>{sidebar && <span style={{ fontSize:13, fontWeight:600 }}>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Topbar */}
        <div style={{ background:"#fff", borderBottom:"1px solid #F3F4F6", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <h1 style={{ fontWeight:900, color:"#0A2540", fontSize:20, margin:0 }}>{nav.find(n=>n.id===tab)?.lbl?.replace(/ \(\d+\)/,"")}</h1>
            <div style={{ color:"#9CA3AF", fontSize:12 }}>Logistics and Transport Hub Tanzania</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {pending.length>0 && (
              <div style={{ background:"#FEE2E2", border:"1px solid #FECACA", color:"#B91C1C", fontSize:11, fontWeight:700, padding:"5px 12px", borderRadius:99, display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:"#EF4444" }}/>
                {pending.length} Pending KYC
              </div>
            )}
            <div style={{ width:36, height:36, background:"#0A2540", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:14 }}>A</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:24 }}>

          {/* OVERVIEW */}
          {tab==="overview" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
                {stats.map(({ lbl, val, Ic, bg, change })=>(
                  <Card key={lbl} style={{ padding:18 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                      <div style={{ background:bg, borderRadius:10, padding:9 }}><Ic width={18} height={18} style={{ color:"#fff" }}/></div>
                      <span style={{ fontSize:11, fontWeight:700, color:"#10B981" }}>{change}</span>
                    </div>
                    <div style={{ fontWeight:900, color:"#0A2540", fontSize:28 }}>{val}</div>
                    <div style={{ color:"#6B7280", fontSize:12, marginTop:4 }}>{lbl}</div>
                  </Card>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <Card style={{ padding:18 }}>
                  <div style={{ fontWeight:800, color:"#0A2540", fontSize:14, marginBottom:14 }}>Recent Loads</div>
                  {loads.map(l=>(
                    <div key={l.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:"1px solid #F9FAFB" }}>
                      <div style={{ width:32, height:32, background:"#EFF6FF", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <I.Package width={14} height={14} style={{ color:"#3B82F6" }}/>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:600, fontSize:12, color:"#0A2540", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>#{l.id} · {l.cargo}</div>
                        <div style={{ fontSize:11, color:"#9CA3AF", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{l.pickup} → {l.dropoff}</div>
                      </div>
                      <Badge s={l.status}/>
                    </div>
                  ))}
                </Card>
                <Card style={{ padding:18 }}>
                  <div style={{ fontWeight:800, color:"#0A2540", fontSize:14, marginBottom:14 }}>Platform Metrics</div>
                  {[["Load completion rate",85,"#10B981"],["Driver utilization",60,"#3B82F6"],["Platform uptime",99,"#10B981"],["KYC approval rate",78,"#F59E0B"]].map(([lbl,val,col])=>(
                    <div key={lbl} style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:12, color:"#6B7280" }}>{lbl}</span>
                        <span style={{ fontSize:12, fontWeight:800, color:"#0A2540" }}>{val}%</span>
                      </div>
                      <div style={{ height:6, background:"#F3F4F6", borderRadius:99 }}>
                        <div style={{ height:6, background:col, borderRadius:99, width:`${val}%`, transition:"width .5s" }}/>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          )}

          {/* KYC */}
          {tab==="kyc" && (
            <div>
              <div style={{ marginBottom:18 }}>
                <h2 style={{ fontWeight:800, color:"#0A2540", fontSize:16, margin:"0 0 4px" }}>KYC Verification Queue</h2>
                <p style={{ color:"#6B7280", fontSize:13, margin:0 }}>{pending.length} driver{pending.length!==1?"s":""} awaiting review</p>
              </div>
              {pending.length===0 ? (
                <div style={{ textAlign:"center", padding:60 }}>
                  <I.CheckCircle width={52} height={52} style={{ color:"#10B981", margin:"0 auto 12px" }}/>
                  <p style={{ color:"#6B7280", fontWeight:600 }}>All drivers verified! Queue is empty.</p>
                </div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
                  {pending.map(d=>(
                    <Card key={d.id} style={{ padding:18 }}>
                      <div style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start" }}>
                        <div style={{ width:46, height:46, background:"#0A2540", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:18, flexShrink:0 }}>{d.name.charAt(0)}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:800, color:"#0A2540", fontSize:14 }}>{d.name}</div>
                          <div style={{ color:"#6B7280", fontSize:12 }}>{d.phone}</div>
                          <div style={{ color:"#9CA3AF", fontSize:11 }}>{d.loc}</div>
                        </div>
                        <Badge s={d.status}/>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, background:"#F9FAFB", borderRadius:10, padding:10, marginBottom:14 }}>
                        {[["Vehicle",d.vehicle],["Plate",d.plate],["Capacity",d.capacity]].map(([k,v])=>(
                          <div key={k}><div style={{ fontSize:10, color:"#9CA3AF" }}>{k}</div><div style={{ fontSize:12, fontWeight:700, color:"#0A2540" }}>{v}</div></div>
                        ))}
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                        {["Driving License","Vehicle Logbook"].map(doc=>(
                          <div key={doc} style={{ border:"1.5px dashed #D1D5DB", borderRadius:10, padding:"10px 8px", textAlign:"center", cursor:"pointer", background:"#F9FAFB" }}>
                            <I.File width={18} height={18} style={{ color:"#9CA3AF", margin:"0 auto 4px" }}/>
                            <div style={{ fontSize:10, fontWeight:600, color:"#6B7280" }}>{doc}</div>
                            <div style={{ fontSize:9, color:"#10B981", fontWeight:700, marginTop:2 }}>View ↗</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                        <button onClick={()=>approveDriver(d.id)} style={{ padding:"10px", background:"#10B981", color:"#fff", fontWeight:700, fontSize:12, borderRadius:10, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                          <I.CheckCircle width={14} height={14}/> Approve
                        </button>
                        <button onClick={()=>setRejectModal(d)} style={{ padding:"10px", background:"#EF4444", color:"#fff", fontWeight:700, fontSize:12, borderRadius:10, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                          <I.XCircle width={14} height={14}/> Reject
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DRIVERS */}
          {tab==="drivers" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <h2 style={{ fontWeight:800, color:"#0A2540", fontSize:16, margin:0 }}>All Drivers ({drivers.length})</h2>
                <div style={{ display:"flex", gap:8, background:"#fff", border:"1.5px solid #E5E7EB", borderRadius:10, padding:"8px 12px", alignItems:"center" }}>
                  <I.Search width={14} height={14} style={{ color:"#9CA3AF" }}/>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search drivers..." style={{ border:"none", outline:"none", fontSize:13, width:140 }}/>
                </div>
              </div>
              <Card>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr style={{ background:"#F9FAFB" }}>
                        {["Driver","Vehicle","Plate","Cap.","Trips","Rating","Status","Action"].map(h=>(
                          <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:.5, whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.filter(d=>d.name.toLowerCase().includes(search.toLowerCase())).map(d=>(
                        <tr key={d.id} style={{ borderTop:"1px solid #F9FAFB" }}>
                          <td style={{ padding:"12px 14px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <div style={{ width:32, height:32, background:"#0A2540", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:13, flexShrink:0 }}>{d.name.charAt(0)}</div>
                              <div><div style={{ fontWeight:600, fontSize:13, color:"#0A2540" }}>{d.name}</div><div style={{ fontSize:11, color:"#9CA3AF" }}>{d.phone}</div></div>
                            </div>
                          </td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#374151" }}>{d.vehicle}</td>
                          <td style={{ padding:"12px 14px", fontSize:12, fontFamily:"monospace", color:"#6B7280" }}>{d.plate}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#374151" }}>{d.capacity}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:"#0A2540" }}>{d.trips}</td>
                          <td style={{ padding:"12px 14px" }}>
                            {d.rating>0 ? <div style={{ display:"flex", alignItems:"center", gap:3 }}><I.Star width={12} height={12} style={{ color:"#F59E0B" }}/><span style={{ fontSize:12, fontWeight:600 }}>{d.rating}</span></div> : <span style={{ color:"#D1D5DB", fontSize:12 }}>—</span>}
                          </td>
                          <td style={{ padding:"12px 14px" }}><Badge s={d.status}/></td>
                          <td style={{ padding:"12px 14px" }}>
                            <div style={{ display:"flex", gap:4 }}>
                              <button style={{ fontSize:11, color:"#3B82F6", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:"2px 4px" }}>View</button>
                              {d.status==="pending" && <button onClick={()=>approveDriver(d.id)} style={{ fontSize:11, color:"#10B981", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:"2px 4px" }}>Approve</button>}
                              {d.status==="approved" && <button style={{ fontSize:11, color:"#EF4444", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:"2px 4px" }}>Suspend</button>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* OWNERS */}
          {tab==="owners" && (
            <div>
              <h2 style={{ fontWeight:800, color:"#0A2540", fontSize:16, marginBottom:16 }}>Cargo Owners ({owners.length})</h2>
              <Card>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr style={{ background:"#F9FAFB" }}>
                        {["Name","Phone","Email","Loads","Status","Action"].map(h=>(
                          <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:.5 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {owners.map(o=>(
                        <tr key={o.id} style={{ borderTop:"1px solid #F9FAFB" }}>
                          <td style={{ padding:"12px 14px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <div style={{ width:32, height:32, background:"#DBEAFE", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#1D4ED8", fontWeight:700, fontSize:13 }}>{o.name.charAt(0)}</div>
                              <span style={{ fontWeight:600, fontSize:13, color:"#0A2540" }}>{o.name}</span>
                            </div>
                          </td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#6B7280" }}>{o.phone}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#6B7280" }}>{o.email}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:"#0A2540" }}>{o.loads}</td>
                          <td style={{ padding:"12px 14px" }}><Badge s={o.status}/></td>
                          <td style={{ padding:"12px 14px" }}>
                            <div style={{ display:"flex", gap:4 }}>
                              <button style={{ fontSize:11, color:"#3B82F6", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:"2px 4px" }}>View</button>
                              <button style={{ fontSize:11, color:"#EF4444", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:"2px 4px" }}>Suspend</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* TRIPS */}
          {tab==="trips" && (
            <div>
              <h2 style={{ fontWeight:800, color:"#0A2540", fontSize:16, marginBottom:16 }}>All Trips &amp; Loads ({loads.length})</h2>
              <Card>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr style={{ background:"#F9FAFB" }}>
                        {["ID","Cargo Owner","Route","Cargo","Weight","Budget","Driver","Status"].map(h=>(
                          <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:.5, whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loads.map(l=>(
                        <tr key={l.id} style={{ borderTop:"1px solid #F9FAFB" }}>
                          <td style={{ padding:"12px 14px", fontFamily:"monospace", fontWeight:700, color:"#0A2540", fontSize:12 }}>{l.id}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#374151" }}>{l.owner}</td>
                          <td style={{ padding:"12px 14px" }}>
                            <div style={{ fontSize:11, color:"#6B7280", maxWidth:160 }}>
                              <div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.pickup}</div>
                              <div style={{ color:"#9CA3AF", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>→ {l.dropoff}</div>
                            </div>
                          </td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#374151" }}>{l.cargo}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#374151" }}>{l.weight}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:"#0A2540", whiteSpace:"nowrap" }}>{l.budget}</td>
                          <td style={{ padding:"12px 14px", fontSize:13, color:"#6B7280" }}>{l.driver||"—"}</td>
                          <td style={{ padding:"12px 14px" }}><Badge s={l.status}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.55)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:24, width:"100%", maxWidth:380, boxShadow:"0 20px 60px rgba(0,0,0,.2)" }}>
            <h3 style={{ fontWeight:800, color:"#0A2540", fontSize:17, marginBottom:6 }}>Reject Driver KYC</h3>
            <p style={{ color:"#6B7280", fontSize:13, marginBottom:16 }}>Rejecting <strong>{rejectModal.name}</strong>. Please provide a reason.</p>
            <Inp label="Rejection Reason" val={rejectReason} set={setRejectReason} ph="e.g. Documents are unclear, please resubmit..." textarea/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:4 }}>
              <Btn v="ghost" onClick={()=>{ setRejectModal(null); setRejectReason(""); }}>Cancel</Btn>
              <Btn v="danger" onClick={()=>{ rejectDriver(rejectModal.id, rejectReason); setRejectModal(null); setRejectReason(""); }}>Confirm Reject</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT ROUTER
═══════════════════════════════════════════════════════════ */
function AppRouter() {
  const { user, login } = useCtx();
  const [page, setPage] = useState("landing");

  const go = (dest, role) => {
    if (dest==="app" && role) login(role);
    setPage(dest);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}} *{box-sizing:border-box} body{margin:0;padding:0;} button:active{transform:scale(.97)}`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (page==="login") return <Login go={go}/>;
  if (page==="register") return <Register go={go}/>;
  if (page==="app" && user) {
    if (user.role==="admin") return <AdminApp/>;
    if (user.role==="driver") return <DriverApp/>;
    return <CargoApp/>;
  }
  return <Landing go={go}/>;
}

export default function LTHTApp() {
  return <Provider><AppRouter/></Provider>;
}
