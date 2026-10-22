import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ShieldCheck, LayoutDashboard, Users, KeyRound, FileText, BellRing,
  Settings, Search, ChevronDown, Menu, X, Download, Plus, Filter,
  MoreHorizontal, CheckCircle2, XCircle, Clock3, Activity, LockKeyhole,
  ArrowUpRight, ShieldAlert, Eye, Pencil, Trash2, LogOut, Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis,
  Tooltip, PieChart, Pie, Cell
} from 'recharts';
import './styles.css';

const initialUsers = [
  { name: 'Olivia Martin', email: 'olivia.martin@company.com', department: 'Engineering', role: 'Administrator', status: 'Active', last: '2 min ago', initials: 'OM', color: 'purple' },
  { name: 'Ethan Williams', email: 'ethan.williams@company.com', department: 'Finance', role: 'Manager', status: 'Active', last: '8 min ago', initials: 'EW', color: 'blue' },
  { name: 'Sophia Brown', email: 'sophia.brown@company.com', department: 'Human Resources', role: 'Employee', status: 'Active', last: '21 min ago', initials: 'SB', color: 'orange' },
  { name: 'Noah Davis', email: 'noah.davis@company.com', department: 'Security', role: 'Auditor', status: 'Active', last: '1 hour ago', initials: 'ND', color: 'green' },
  { name: 'Ava Wilson', email: 'ava.wilson@company.com', department: 'Engineering', role: 'Employee', status: 'Suspended', last: 'Yesterday', initials: 'AW', color: 'pink' },
  { name: 'Liam Anderson', email: 'liam.anderson@company.com', department: 'Operations', role: 'Manager', status: 'Active', last: 'Yesterday', initials: 'LA', color: 'teal' }
];
const events = [
  { user: 'olivia.martin@company.com', resource: 'Admin Dashboard', action: 'View', decision: 'Allowed', time: '10:42:18 AM', ip: '192.168.1.24' },
  { user: 'ethan.williams@company.com', resource: 'Payroll Records', action: 'Export', decision: 'Denied', time: '10:38:05 AM', ip: '192.168.1.31' },
  { user: 'sophia.brown@company.com', resource: 'Employee Directory', action: 'View', decision: 'Allowed', time: '10:31:44 AM', ip: '192.168.1.56' },
  { user: 'unknown.user@external.com', resource: 'System Settings', action: 'Login attempt', decision: 'Denied', time: '10:24:09 AM', ip: '185.22.44.8' },
  { user: 'noah.davis@company.com', resource: 'Audit Logs', action: 'View', decision: 'Allowed', time: '10:16:52 AM', ip: '192.168.1.77' },
  { user: 'ava.wilson@company.com', resource: 'Customer Database', action: 'Edit', decision: 'Denied', time: '09:58:21 AM', ip: '192.168.1.43' }
];
const activityData = [
  { time: '8 AM', allowed: 24, denied: 3 }, { time: '9 AM', allowed: 38, denied: 6 },
  { time: '10 AM', allowed: 31, denied: 4 }, { time: '11 AM', allowed: 52, denied: 9 },
  { time: '12 PM', allowed: 43, denied: 5 }, { time: '1 PM', allowed: 64, denied: 8 },
  { time: '2 PM', allowed: 48, denied: 7 }, { time: '3 PM', allowed: 72, denied: 11 }
];
const roleData = [
  { name: 'Employee', value: 58, color: '#5b7cfa' },
  { name: 'Manager', value: 24, color: '#26b7a5' },
  { name: 'Auditor', value: 12, color: '#f4b44d' },
  { name: 'Admin', value: 6, color: '#a78bfa' }
];
const nav = [
  { label: 'Overview', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Users', icon: Users, group: 'Identity & access' },
  { label: 'My Resources', icon: LockKeyhole, group: 'Identity & access' },
  { label: 'Roles & Permissions', icon: KeyRound, group: 'Identity & access' },
  { label: 'Just-in-time Access', icon: Clock3, group: 'Identity & access' },
  { label: 'Access Policies', icon: FileText, group: 'Adaptive authorization' },
  { label: 'Audit Logs', icon: Activity, group: 'Security monitoring' },
  { label: 'Decision Trace', icon: Search, group: 'Security monitoring' },
  { label: 'Security Alerts', icon: BellRing, group: 'Security monitoring' }
];

function App() {
  const [page, setPage] = useState('Overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Employee');
  const [notice, setNotice] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const filteredUsers = useMemo(() => users.filter(u =>
    `${u.name} ${u.email} ${u.department} ${u.role}`.toLowerCase().includes(query.toLowerCase())
  ), [users, query]);
  const filteredEvents = useMemo(() => events.filter(e =>
    `${e.user} ${e.resource} ${e.decision} ${e.action}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  function addUser(e) {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    const initials = newName.trim().split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase();
    setUsers([{ name: newName.trim(), email: newEmail.trim(), department: 'General', role: newRole, status: 'Active', last: 'Just now', initials, color: 'blue' }, ...users]);
    setNewName(''); setNewEmail(''); setNewRole('Employee'); setShowAdd(false);
    setNotice('User added to this demo interface.');
    setTimeout(() => setNotice(''), 3000);
  }

  function exportCsv() {
    const csv = ['User,Resource,Action,Decision,Time,IP', ...events.map(e => [e.user,e.resource,e.action,e.decision,e.time,e.ip].map(v => `"${v}"`).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a'); a.href = url; a.download = 'rbac-audit-logs.csv'; a.click(); URL.revokeObjectURL(url);
  }

  if (!signedIn) return <LoginPage onSignIn={() => setSignedIn(true)} />;
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><ShieldCheck size={23}/></div><div><strong>Access<span>Guard</span></strong><small>ENTERPRISE SECURITY</small></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={19}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{nav.map((item, index) => <React.Fragment key={item.label}>{(index === 0 || nav[index - 1].group !== item.group) && <div className="nav-group-label">{item.group}</div>}<button className={`nav-item ${page === item.label ? 'active' : ''}`} onClick={() => {setPage(item.label); setMobileOpen(false); setQuery('');}}><item.icon size={18}/><span>{item.label}</span>{item.label === 'Security Alerts' && <b className="nav-count">3</b>}</button></React.Fragment>)}</nav>
      <div className="sidebar-bottom">
        <div className="secure-card"><div className="secure-icon"><LockKeyhole size={17}/></div><strong>Security status</strong><span><i/> All systems operational</span><div className="secure-progress"><i/></div><small>Last scan · 4 minutes ago</small></div>
        <button className={`nav-item ${page === 'Settings' ? 'active' : ''}`} onClick={() => setPage('Settings')}><Settings size={18}/><span>Settings</span></button>
        <div className="sidebar-profile"><div className="avatar avatar-admin">AM</div><div className="profile-copy"><strong>Alex Morgan</strong><small>Super Administrator</small></div><MoreHorizontal size={19}/></div>
      </div>
    </aside>

    {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}/>}
    <main className="main-content">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={22}/></button>
        <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{page}</strong></div>
        <div className="top-actions"><div className="search-box"><Search size={17}/><input aria-label="Search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></div><button className="icon-button notification" title="Notifications" onClick={() => setPage('Security Alerts')}><BellRing size={19}/><i/></button><div className="top-divider"/><div className="top-user"><div className="avatar avatar-admin">AM</div><div><strong>Alex Morgan</strong><small>Administrator</small></div><ChevronDown size={15}/></div></div>
      </header>

      <div className="page-wrap">
        {notice && <div className="notice"><CheckCircle2 size={17}/>{notice}</div>}
        {page === 'Overview' && <Overview onNavigate={setPage} />}
        {page === 'Users' && <UsersPage users={filteredUsers} onAdd={() => setShowAdd(true)} />}
        {page === 'My Resources' && <ResourcesPage />}
        {page === 'Roles & Permissions' && <RolesPage />}
        {page === 'Just-in-time Access' && <JitAccessPage />}
        {page === 'Access Policies' && <PoliciesPage />}
        {page === 'Audit Logs' && <AuditPage rows={filteredEvents} onExport={exportCsv} />}
        {page === 'Decision Trace' && <DecisionTracePage />}
        {page === 'Security Alerts' && <AlertsPage />}
        {page === 'Settings' && <SettingsPage />}
      </div>
      <footer className="footer"><span>© 2026 AccessGuard · Academic project prototype</span><span><i/> All services operational <span className="footer-dot">·</span> v1.0.0</span></footer>
    </main>

    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><form className="modal" onSubmit={addUser} onClick={e => e.stopPropagation()}><div className="modal-heading"><div><h2>Add new user</h2><p>Create a user profile and assign a role.</p></div><button type="button" className="icon-button" onClick={() => setShowAdd(false)}><X size={19}/></button></div><label>Full name<input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Jordan Lee" required /></label><label>Email address<input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="jordan@company.com" required /></label><label>Role<select value={newRole} onChange={e => setNewRole(e.target.value)}><option>Employee</option><option>Manager</option><option>Auditor</option></select></label><div className="modal-actions"><button type="button" className="btn btn-light" onClick={() => setShowAdd(false)}>Cancel</button><button type="submit" className="btn btn-primary"><Plus size={16}/> Add user</button></div><p className="modal-note">Demo only: changes are stored in the current browser session, not a backend database.</p></form></div>}
  </div>;
}

function LoginPage({onSignIn}) {
  return <main className="login-screen"><form className="login-card" onSubmit={e => {e.preventDefault(); onSignIn();}}><div className="brand-mark"><ShieldCheck size={25}/></div><div className="eyebrow">ACCESSGUARD WORKSPACE</div><h1>Sign in to continue</h1><p>Use your organization account to access identity and security tools.</p><label>Email address<input type="email" placeholder="you@company.com" required defaultValue="alex.morgan@company.com"/></label><label>Password<input type="password" placeholder="Enter your password" required defaultValue="prototype"/></label><button className="btn btn-primary login-submit" type="submit">Continue with organization account</button><div className="login-note"><LockKeyhole size={14}/> Keycloak sign-in integration is pending. This prototype uses a local demo sign-in.</div></form></main>;
}
function ResourcesPage() {
  const rows=[['Project workspace','Engineering','Read, edit','Employee'],['Team directory','Organization','Read','Employee'],['Payroll records','Finance','No access','Employee'],['Audit archive','Security','No access','Employee']];
  return <><PageHeading eyebrow="IDENTITY & ACCESS" title="My resources" description="Resources available to your current role and organization attributes."/><div className="permission-notice"><ShieldCheck size={18}/><span><strong>Signed in as Employee</strong><small>Access shown here is a prototype preview. A server policy engine must enforce these permissions.</small></span></div><section className="panel table-panel"><div className="table-toolbar"><div><h2>Available resources</h2><p>Permissions evaluated for your assigned role.</p></div></div><div className="table-scroll"><table><thead><tr><th>RESOURCE</th><th>OWNER</th><th>YOUR ACCESS</th><th>ROLE</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td><span className={`status-pill ${r[2]==='No access'?'danger':'success'}`}><i/>{r[2]}</span></td><td><span className="role-chip">{r[3]}</span></td></tr>)}</tbody></table></div></section></>;
}
function DecisionTracePage() {
  const [selected,setSelected]=useState(0);
  const row=events[selected];
  return <><PageHeading eyebrow="SECURITY MONITORING" title="Policy decision trace" description="Inspect the sample context and policy checks behind an access decision."/><section className="panel table-panel"><div className="table-toolbar"><div><h2>Recent decisions</h2><p>Select a request to inspect its evaluation trace.</p></div></div><div className="table-scroll"><table><thead><tr><th>USER</th><th>RESOURCE</th><th>ACTION</th><th>DECISION</th><th></th></tr></thead><tbody>{events.map((e,i)=><tr key={e.user+e.time}><td>{e.user}</td><td>{e.resource}</td><td>{e.action}</td><td>{e.decision}</td><td><button className="text-link" onClick={()=>setSelected(i)}>Inspect</button></td></tr>)}</tbody></table></div></section><section className="panel settings-panel"><div className="panel-heading"><div><h2>Evaluation details</h2><p>{row.user} · {row.time} · {row.ip}</p></div><span className={`status-pill ${row.decision==='Allowed'?'success':'danger'}`}><i/>{row.decision}</span></div><div className="permission-list">{[['Identity','Account identified from request context'],['Role check','Assigned role and requested action evaluated'],['Resource attributes',`${row.resource} · sensitivity and ownership context checked`],['Context check','Department, device trust, and request time considered'],['Policy result',`${row.action} request ${row.decision.toLowerCase()} by sample policy`]].map(x=><div className="permission-row" key={x[0]}><div><strong>{x[0]}</strong><small>{x[1]}</small></div><CheckCircle2 size={17} className="muted-cell"/></div>)}</div><p className="modal-note">Illustrative trace only. OPA and live policy evaluation are pending integration.</p></section></>;
}
function PageHeading({eyebrow, title, description, action}) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="heading-action">{action}</div>}</div>;
}
function Overview({onNavigate}) {
  const stats = [
    { label:'Total users', value:'1,248', change:'+12.8%', note:'vs. last month', icon:Users, color:'blue', spark:'M2 19 L12 14 L22 16 L32 8 L42 11 L52 4' },
    { label:'Active roles', value:'18', change:'+2', note:'new this month', icon:KeyRound, color:'mint', spark:'M2 17 L12 12 L22 15 L32 6 L42 9 L52 3' },
    { label:'Access policies', value:'42', change:'+4.6%', note:'vs. last month', icon:FileText, color:'violet', spark:'M2 17 L12 16 L22 10 L32 13 L42 5 L52 7' },
    { label:'Security alerts', value:'07', change:'Needs review', note:'3 high priority', icon:ShieldAlert, color:'amber', spark:'M2 5 L12 12 L22 8 L32 17 L42 11 L52 19' }
  ];
  return <>
    <PageHeading eyebrow="OVERVIEW" title="Security overview" description="Monitor access activity and keep your organization secure." action={<><button className="btn btn-light" onClick={() => onNavigate('Audit Logs')}><FileText size={16}/> View audit logs</button><button className="btn btn-primary" onClick={() => onNavigate('Users')}><Plus size={16}/> Manage users</button></>}/>
    <div className="welcome-strip"><div className="welcome-symbol"><Sparkles size={20}/></div><div><strong>Good morning, Alex <span>✦</span></strong><p>Here's what's happening across your security environment today.</p></div><div className="welcome-date"><span>MONDAY, OCTOBER 21</span><strong>Security report <ArrowUpRight size={14}/></strong></div></div>
    <div className="stats-grid">{stats.map(s => <div className="stat-card" key={s.label}><div className="stat-top"><span>{s.label}</span><div className={`stat-icon ${s.color}`}><s.icon size={18}/></div></div><div className="stat-value">{s.value}</div><div className="stat-bottom"><span className={s.color === 'amber' ? 'change warning-text' : 'change'}>{s.change}</span><span>{s.note}</span><svg className={`sparkline ${s.color}`} viewBox="0 0 56 24"><path d={s.spark} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div></div>)}</div>
    <div className="chart-grid">
      <section className="panel activity-panel"><div className="panel-heading"><div><h2>Access activity</h2><p>Access requests processed over time</p></div><select className="select-small" defaultValue="Today"><option>Today</option><option>This week</option><option>This month</option></select></div><div className="chart-legend"><span><i className="legend-blue"/> Allowed requests</span><span><i className="legend-red"/> Denied requests</span></div><div className="activity-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={activityData} margin={{top:10,right:4,left:-20,bottom:0}}><defs><linearGradient id="allowedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5578f6" stopOpacity={0.19}/><stop offset="95%" stopColor="#5578f6" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#edf0f6" vertical={false}/><XAxis dataKey="time" tickLine={false} axisLine={false} tick={{fill:'#9299ab',fontSize:11}} dy={10}/><YAxis tickLine={false} axisLine={false} tick={{fill:'#9299ab',fontSize:11}}/><Tooltip contentStyle={{border:'1px solid #e9edf5',borderRadius:10,fontSize:12}}/><Area type="monotone" dataKey="allowed" name="Allowed" stroke="#5578f6" strokeWidth={2.5} fill="url(#allowedFill)"/><Area type="monotone" dataKey="denied" name="Denied" stroke="#ef6a75" strokeWidth={2} fill="transparent"/></AreaChart></ResponsiveContainer></div></section>
      <section className="panel roles-panel"><div className="panel-heading"><div><h2>Users by role</h2><p>Role distribution across your organization</p></div><button className="icon-button subtle" onClick={() => onNavigate('Roles & Permissions')}><MoreHorizontal size={19}/></button></div><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={roleData} innerRadius={63} outerRadius={87} paddingAngle={4} dataKey="value" stroke="none"><Cell fill="#5b7cfa"/><Cell fill="#26b7a5"/><Cell fill="#f4b44d"/><Cell fill="#a78bfa"/></Pie><Tooltip formatter={(v) => `${v}%`}/></PieChart></ResponsiveContainer><div className="donut-center"><strong>1,248</strong><span>Total users</span></div></div><div className="role-legend">{roleData.map(r=><div key={r.name}><span><i style={{background:r.color}}/>{r.name}</span><strong>{r.value}%</strong></div>)}</div></section>
    </div>
    <section className="panel events-panel"><div className="panel-heading"><div><h2>Recent access events</h2><p>Latest authorization decisions from your system</p></div><button className="text-link" onClick={() => onNavigate('Audit Logs')}>View all events <ArrowUpRight size={15}/></button></div><EventsTable rows={events.slice(0,4)} compact/></section>
    <div className="bottom-grid"><section className="panel health-panel"><div className="panel-heading"><div><h2>Policy engine status</h2><p>Open Policy Agent (OPA)</p></div><span className="status-pill success"><i/> Operational</span></div><div className="health-metrics"><div><span>Avg. decision time</span><strong>18 <small>ms</small></strong></div><div><span>Policies evaluated</span><strong>24.8k</strong></div><div><span>Uptime</span><strong>99.98%</strong></div></div></section><section className="panel alert-summary"><div className="panel-heading"><div><h2>Security attention</h2><p>Items that may need review</p></div><ShieldAlert size={19} className="alert-heading-icon"/></div><button className="alert-row" onClick={() => onNavigate('Security Alerts')}><span className="alert-dot high"/> <span><strong>Unusual login activity</strong><small>2 events · 12 minutes ago</small></span><span className="severity high-text">High</span><ArrowUpRight size={15}/></button><button className="alert-row" onClick={() => onNavigate('Security Alerts')}><span className="alert-dot medium"/> <span><strong>Repeated denied requests</strong><small>1 user · 28 minutes ago</small></span><span className="severity medium-text">Medium</span><ArrowUpRight size={15}/></button></section></div>
  </>;
}

function UsersPage({users, onAdd}) {
  return <><PageHeading eyebrow="IDENTITY MANAGEMENT" title="User management" description="Manage user accounts, departments, and assigned access roles." action={<><button className="btn btn-light"><Filter size={16}/> Filters</button><button className="btn btn-primary" onClick={onAdd}><Plus size={16}/> Add user</button></>}/><div className="mini-stats"><div><span>Total users</span><strong>1,248</strong></div><div><span>Active accounts</span><strong>1,211</strong></div><div><span>Suspended</span><strong>37</strong></div><div><span>Pending invites</span><strong>12</strong></div></div><section className="panel table-panel"><div className="table-toolbar"><div><h2>All users <span className="count-badge">{users.length}</span></h2><p>Search and manage registered accounts.</p></div><button className="btn btn-light btn-sm"><Download size={15}/> Export</button></div><div className="table-scroll"><table><thead><tr><th>USER</th><th>DEPARTMENT</th><th>ROLE</th><th>STATUS</th><th>LAST ACTIVE</th><th></th></tr></thead><tbody>{users.map(u=><tr key={u.email}><td><div className="user-cell"><div className={`avatar avatar-${u.color}`}>{u.initials}</div><div><strong>{u.name}</strong><small>{u.email}</small></div></div></td><td>{u.department}</td><td><span className="role-chip">{u.role}</span></td><td><span className={`status-pill ${u.status==='Active'?'success':'danger'}`}><i/>{u.status}</span></td><td className="muted-cell">{u.last}</td><td><button className="icon-button subtle"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table>{users.length===0&&<div className="empty-state">No users match your search.</div>}</div><div className="table-footer"><span>Showing {users.length} users in this view</span><div><button disabled>Previous</button><button className="current-page">1</button><button>Next</button></div></div></section></>;
}

function RolesPage() {
  const [selected,setSelected] = useState('Administrator');
  const [saved,setSaved] = useState(false);
  const roles = [
    {name:'Administrator',desc:'Full system configuration and user management',users:8,color:'purple',tag:'Privileged'},
    {name:'Manager',desc:'Department-level access and team oversight',users:46,color:'blue'},
    {name:'Employee',desc:'Standard access to assigned work resources',users:1124,color:'mint'},
    {name:'Auditor',desc:'Read-only access to logs and compliance reports',users:70,color:'orange'}
  ];
  const permissions = ['View dashboard','Manage users','Manage roles','View audit logs','Edit policies','Export reports','Access sensitive data'];
  const map = {'Administrator':[1,1,1,1,1,1,1],'Manager':[1,0,0,0,0,1,0],'Employee':[1,0,0,0,0,0,0],'Auditor':[1,0,0,1,0,1,0]};
  return <><PageHeading eyebrow="ACCESS GOVERNANCE" title="Roles & permissions" description="Define what each role can access and which actions it can perform." action={<button className="btn btn-primary" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)}}><Plus size={16}/> Create role</button>}/>{saved&&<div className="notice"><CheckCircle2 size={17}/>Demo action received. Connect a backend to save role changes.</div>}<div className="roles-layout"><section className="panel role-list-panel"><div className="panel-heading"><div><h2>Defined roles</h2><p>4 standard roles</p></div></div>{roles.map(r=><button key={r.name} className={`role-option ${selected===r.name?'selected':''}`} onClick={()=>setSelected(r.name)}><div className={`role-icon ${r.color}`}><KeyRound size={18}/></div><div className="role-option-copy"><strong>{r.name} {r.tag&&<span className="privileged-tag">{r.tag}</span>}</strong><small>{r.desc}</small><span className="role-users"><Users size={13}/>{r.users.toLocaleString()} users</span></div><ArrowUpRight size={15}/></button>)}</section><section className="panel permission-panel"><div className="panel-heading"><div><h2>{selected} permissions</h2><p>Configure access rights for this role.</p></div><span className="status-pill success"><i/> Active role</span></div><div className="permission-notice"><ShieldCheck size={18}/><span><strong>Principle of least privilege</strong><small>Grant only the permissions needed to perform each role's responsibilities.</small></span></div><div className="permission-list">{permissions.map((p,i)=><div className="permission-row" key={p}><div><strong>{p}</strong><small>{['Access the security overview and analytics','Invite, edit, suspend, and manage accounts','Create roles and assign permissions','Review authorization and login history','Create and update authorization rules','Download system and compliance reports','View restricted enterprise information'][i]}</small></div><span className={`permission-toggle ${map[selected][i]?'on':''}`}><i/></span></div>)}</div><div className="permission-footer"><span>Preview only · Connect backend to persist changes</span><button className="btn btn-primary" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)}}>Save permissions</button></div></section></div></>;
}

function JitAccessPage() {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Sophia Brown', email: 'sophia.brown@company.com', role: 'Employee', resource: 'Production database', reason: 'Investigate a failed customer data sync', duration: '2 hours', requested: '8 min ago', status: 'Pending' },
    { id: 2, name: 'Ethan Williams', email: 'ethan.williams@company.com', role: 'Manager', resource: 'Payroll export', reason: 'Prepare the monthly finance report', duration: '1 hour', requested: '24 min ago', status: 'Pending' },
    { id: 3, name: 'Noah Davis', email: 'noah.davis@company.com', role: 'Auditor', resource: 'Identity provider settings', reason: 'Review configuration for quarterly audit', duration: '4 hours', requested: '1 hour ago', status: 'Approved' }
  ]);
  const [filter, setFilter] = useState('All requests');
  const updateRequest = (id, status) => setRequests(items => items.map(item => item.id === id ? { ...item, status } : item));
  const visible = filter === 'All requests' ? requests : requests.filter(item => item.status === filter);
  const pending = requests.filter(item => item.status === 'Pending').length;
  return <>
    <PageHeading eyebrow="IDENTITY & ACCESS" title="Just-in-time access" description="Review temporary privilege requests and grant only the access needed for a specific task." action={<button className="btn btn-light" onClick={() => setRequests(items => [{ id: Date.now(), name: 'Jordan Lee', email: 'jordan.lee@company.com', role: 'Employee', resource: 'Customer records', reason: 'Resolve a support escalation', duration: '1 hour', requested: 'Just now', status: 'Pending' }, ...items])}><Plus size={16}/> Simulate request</button>}/>
    <div className="policy-banner"><div className="policy-banner-icon"><Clock3 size={22}/></div><div><strong>Least privilege with automatic expiry</strong><p>Temporary access is scoped to a resource and duration. Approved grants expire automatically.</p></div><span className="status-pill success"><i/> Enabled</span></div>
    <div className="jit-stats"><div><span>Pending review</span><strong>{pending}</strong></div><div><span>Approved today</span><strong>{requests.filter(item => item.status === 'Approved').length}</strong></div><div><span>Typical grant</span><strong>2 hours</strong></div></div>
    <section className="panel jit-panel"><div className="table-toolbar"><div><h2>Privilege requests <span className="count-badge">{visible.length}</span></h2><p>Approve or deny temporary access to sensitive resources.</p></div><select className="select-small" value={filter} onChange={event => setFilter(event.target.value)}><option>All requests</option><option>Pending</option><option>Approved</option><option>Denied</option></select></div>
      <div className="jit-list">{visible.map(item => <article className="jit-card" key={item.id}><div className="jit-person"><div className="avatar avatar-blue">{item.name.split(' ').map(part => part[0]).join('')}</div><div><strong>{item.name}</strong><small>{item.email} · {item.role}</small></div></div><div className="jit-resource"><span>REQUESTED RESOURCE</span><strong>{item.resource}</strong></div><div className="jit-reason"><span>BUSINESS REASON</span><p>{item.reason}</p></div><div className="jit-duration"><Clock3 size={14}/><span>{item.duration}</span></div><div className="jit-review"><span className={`status-pill ${item.status === 'Approved' ? 'success' : item.status === 'Denied' ? 'danger' : 'neutral'}`}><i/>{item.status}</span>{item.status === 'Pending' && <div><button className="btn btn-light btn-sm" onClick={() => updateRequest(item.id, 'Denied')}>Deny</button><button className="btn btn-primary btn-sm" onClick={() => updateRequest(item.id, 'Approved')}><CheckCircle2 size={14}/> Approve</button></div>}{item.status !== 'Pending' && <small>Requested {item.requested}</small>}</div></article>)}{visible.length === 0 && <div className="empty-state">No {filter.toLowerCase()} to show.</div>}</div>
      <div className="jit-footnote"><LockKeyhole size={14}/> Demo workflow only. A connected identity provider must enforce grants and expiration.</div>
    </section>
  </>;
}

function PoliciesPage() {
  const [enabled,setEnabled] = useState([true,true,false,true]);
  const policies = [
    {name:'Department-based access',desc:'Restrict resources to users in approved departments.',type:'ABAC',updated:'Today, 9:14 AM',status:'Active'},
    {name:'Trusted device required',desc:'Require a trusted device for sensitive resources.',type:'Device trust',updated:'Yesterday',status:'Active'},
    {name:'Business hours restriction',desc:'Limit selected administrative actions to working hours.',type:'Context-aware',updated:'Oct 18, 2026',status:'Paused'},
    {name:'Sensitive data protection',desc:'Require elevated permissions for confidential records.',type:'Resource sensitivity',updated:'Oct 17, 2026',status:'Active'}
  ];
  return <><PageHeading eyebrow="POLICY MANAGEMENT" title="Access policies" description="Create context-aware rules using roles, attributes, and resource sensitivity." action={<button className="btn btn-primary"><Plus size={16}/> Create policy</button>}/><div className="policy-banner"><div className="policy-banner-icon"><ShieldCheck size={23}/></div><div><strong>Policy engine connected</strong><p>Open Policy Agent (OPA) evaluates authorization policies before access is granted.</p></div><span className="status-pill success"><i/> Connected</span></div><div className="policy-summary"><div><span>Total policies</span><strong>42</strong></div><div><span>Active policies</span><strong>38</strong></div><div><span>Policy evaluations today</span><strong>24,812</strong></div><div><span>Last policy update</span><strong>9:14 AM</strong></div></div><section className="panel policy-list"><div className="panel-heading"><div><h2>Policy rules</h2><p>Enable or pause policies in this demo.</p></div><button className="btn btn-light"><Filter size={15}/> Filter</button></div>{policies.map((p,i)=><div className="policy-row" key={p.name}><div className="policy-symbol"><FileText size={19}/></div><div className="policy-copy"><strong>{p.name}</strong><p>{p.desc}</p><div className="policy-meta"><span>{p.type}</span><span>Updated {p.updated}</span></div></div><span className={`status-pill ${enabled[i]?'success':'neutral'}`}><i/>{enabled[i]?'Active':'Paused'}</span><button className={`switch ${enabled[i]?'switch-on':''}`} aria-label={`Toggle ${p.name}`} onClick={()=>setEnabled(enabled.map((v,j)=>i===j?!v:v))}><i/></button><button className="icon-button subtle"><MoreHorizontal size={18}/></button></div>)}</section></>;
}

function EventsTable({rows,compact=false}) {
  return <div className="table-scroll"><table><thead><tr><th>USER</th><th>RESOURCE</th>{!compact&&<th>ACTION</th>}<th>DECISION</th><th>TIME</th>{!compact&&<th>IP ADDRESS</th>}</tr></thead><tbody>{rows.map((e,i)=><tr key={e.user+e.time}><td><div className="event-user"><span className={`tiny-avatar tiny-${i%4}`}>{e.user.slice(0,1).toUpperCase()}</span><span>{e.user}</span></div></td><td>{e.resource}</td>{!compact&&<td>{e.action}</td>}<td><span className={`decision ${e.decision==='Allowed'?'allowed':'denied'}`}>{e.decision==='Allowed'?<CheckCircle2 size={14}/>:<XCircle size={14}/>} {e.decision}</span></td><td className="muted-cell">{e.time}</td>{!compact&&<td className="muted-cell">{e.ip}</td>}</tr>)}</tbody></table>{rows.length===0&&<div className="empty-state">No events match your search.</div>}</div>;
}
function AuditPage({rows,onExport}) {
  const [decision,setDecision] = useState('All decisions');
  const shown = decision==='All decisions'?rows:rows.filter(r=>r.decision===decision.replace(' requests','').replace('Denied','Denied').replace('Allowed','Allowed'));
  return <><PageHeading eyebrow="COMPLIANCE & MONITORING" title="Audit logs" description="Review a traceable record of authorization requests and decisions." action={<button className="btn btn-primary" onClick={onExport}><Download size={16}/> Export CSV</button>}/><div className="audit-summary"><div><Activity size={18}/><span>Events today</span><strong>8,492</strong></div><div><CheckCircle2 size={18}/><span>Allowed</span><strong>8,211</strong></div><div><XCircle size={18}/><span>Denied</span><strong>281</strong></div><div><Clock3 size={18}/><span>Avg. response</span><strong>18 ms</strong></div></div><section className="panel table-panel"><div className="table-toolbar"><div><h2>Authorization events</h2><p>Searchable sample events for the frontend prototype.</p></div><select className="select-small" value={decision} onChange={e=>setDecision(e.target.value)}><option>All decisions</option><option>Allowed</option><option>Denied</option></select></div><EventsTable rows={shown}/><div className="table-footer"><span>Showing {shown.length} sample events</span><span className="muted-cell">Demo data · Not connected to a live audit service</span></div></section></>;
}
function AlertsPage() {
  const [resolved,setResolved] = useState([]);
  const alerts = [
    {id:1,title:'Unusual login location detected',desc:'A login was attempted from an unfamiliar network location.',user:'unknown.user@external.com',time:'12 minutes ago',level:'High',icon:ShieldAlert},
    {id:2,title:'Repeated access denials',desc:'Multiple requests to restricted resources were denied.',user:'ethan.williams@company.com',time:'28 minutes ago',level:'Medium',icon:LockKeyhole},
    {id:3,title:'Privilege elevation request',desc:'A temporary administrator permission request needs review.',user:'sophia.brown@company.com',time:'46 minutes ago',level:'Medium',icon:KeyRound}
  ];
  return <><PageHeading eyebrow="THREAT MONITORING" title="Security alerts" description="Review suspicious activity and take appropriate follow-up action." action={<button className="btn btn-light"><Filter size={16}/> Filter alerts</button>}/><div className="alert-kpis"><div><span className="alert-kpi-icon high-bg"><ShieldAlert size={18}/></span><span>High priority<strong>1</strong></span></div><div><span className="alert-kpi-icon medium-bg"><BellRing size={18}/></span><span>Medium priority<strong>2</strong></span></div><div><span className="alert-kpi-icon low-bg"><CheckCircle2 size={18}/></span><span>Resolved today<strong>{resolved.length}</strong></span></div></div><section className="panel alerts-panel"><div className="panel-heading"><div><h2>Recent alerts</h2><p>Sample alerts generated for this prototype.</p></div><span className="count-badge">{alerts.length-resolved.length} open</span></div>{alerts.map(a=><div className={`alert-card ${resolved.includes(a.id)?'resolved-card':''}`} key={a.id}><div className={`alert-card-icon ${a.level==='High'?'high-bg':'medium-bg'}`}><a.icon size={20}/></div><div className="alert-card-main"><div className="alert-card-title"><strong>{a.title}</strong><span className={`severity ${a.level==='High'?'high-text':'medium-text'}`}>{a.level}</span></div><p>{a.desc}</p><div className="alert-card-meta"><span><Users size={13}/>{a.user}</span><span><Clock3 size={13}/>{a.time}</span></div></div><button className={`btn ${resolved.includes(a.id)?'btn-light':'btn-primary'} btn-sm`} onClick={()=>setResolved(resolved.includes(a.id)?resolved.filter(x=>x!==a.id):[...resolved,a.id])}>{resolved.includes(a.id)?'Reopen':'Mark resolved'}</button></div>)}</section></>;
}
function SettingsPage() {
  const [toggles,setToggles] = useState([true,true,false,true]);
  const items=[['Multi-factor authentication','Require an additional verification step at sign-in.'],['Account lockout','Temporarily lock accounts after repeated failed attempts.'],['AI anomaly detection','Flag unusual access patterns for administrator review.'],['Audit event logging','Record authorization decisions and administrative changes.']];
  return <><PageHeading eyebrow="CONFIGURATION" title="Security settings" description="Configure security controls for the RBAC framework." action={<button className="btn btn-primary" onClick={()=>alert('Demo only: connect a backend to persist settings.')}>Save settings</button>}/><section className="panel settings-panel"><div className="panel-heading"><div><h2>Security controls</h2><p>Prototype settings — not enforced by a live server.</p></div><Settings size={20} className="muted-cell"/></div>{items.map((it,i)=><div className="setting-row" key={it[0]}><div className="setting-icon"><LockKeyhole size={18}/></div><div><strong>{it[0]}</strong><p>{it[1]}</p></div><button className={`switch ${toggles[i]?'switch-on':''}`} onClick={()=>setToggles(toggles.map((v,j)=>i===j?!v:v))} aria-label={`Toggle ${it[0]}`}><i/></button></div>)}</section><section className="panel profile-settings"><div className="panel-heading"><div><h2>Administrator profile</h2><p>Signed-in demo account information</p></div></div><div className="admin-profile-row"><div className="avatar avatar-admin large-avatar">AM</div><div><strong>Alex Morgan</strong><p>alex.morgan@company.com</p><span className="role-chip">Super Administrator</span></div><button className="btn btn-light"><Pencil size={15}/> Edit profile</button></div></section></>;
}

createRoot(document.getElementById('root')).render(<App />);
