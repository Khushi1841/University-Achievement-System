import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Code, Trophy, Music, BookOpen, ShieldCheck, ArrowLeft, Calendar, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// 🌠 ANIMATED BACKGROUND COMPONENT 🌠
const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-black z-0"></div>
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] animate-[pulse_5s_ease-in-out_infinite] opacity-40 z-0"></div>
    <div className="absolute top-[30%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] animate-[pulse_7s_ease-in-out_infinite] opacity-40 z-0"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] animate-[pulse_6s_ease-in-out_infinite] opacity-40 z-0"></div>
    
    <div className="absolute inset-0 z-0 opacity-40">
      {[...Array(40)].map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"
          style={{
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`,
            animationDuration: `${Math.random() * 3 + 1}s`, animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}
    </div>
  </div>
);

// ----------------------------------------------------
// 1. HOME PAGE
// ----------------------------------------------------
function Home() {
  const categories = [
    { id: 'technical', name: 'Coding & Tech', icon: <Code size={40} />, color: 'bg-blue-500', desc: 'Hackathons & Coding contests' },
    { id: 'sports', name: 'Sports', icon: <Trophy size={40} />, color: 'bg-green-500', desc: 'Cricket, Football, Athletics' },
    { id: 'cultural', name: 'Cultural', icon: <Music size={40} />, color: 'bg-purple-500', desc: 'Dancing, Singing, Drama' },
    { id: 'academics', name: 'Academics', icon: <BookOpen size={40} />, color: 'bg-yellow-500', desc: 'Research & Top Performers' },
  ];

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 p-8">
        {/* 👇 YAHAN RESPONSIVE HEADER HAI 👇 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto mb-16 border-b border-white/10 pb-6 text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-wide flex flex-col md:flex-row items-center gap-4 text-white">
            <img 
              src="/shobhit.png" 
              alt="Shobhit Logo" 
              className="w-16 h-16 object-contain bg-white rounded-full p-1 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-[bounce_3s_infinite] hover:animate-none hover:rotate-180 hover:scale-110 transition-all duration-500 cursor-pointer" 
              onError={(e:any) => e.target.style.display = 'none'} 
            />
            Shobhit University
          </h1>
          <Link to="/admin" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md transition-all font-semibold border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white">
            <ShieldCheck size={20} className="text-green-400" /> Admin Access
          </Link>
        </div>

        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Wall of Fame</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">Explore the outstanding achievements of our brilliant students.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto mb-16">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="group relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-300 cursor-pointer overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${cat.color} group-hover:h-full opacity-10 group-hover:opacity-20 transition-all duration-500 z-0`}></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`${cat.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>{cat.icon}</div>
                <h3 className="text-2xl font-bold mb-3 tracking-wide text-white">{cat.name}</h3>
                <p className="text-gray-300 text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. CATEGORY PAGE
// ----------------------------------------------------
function CategoryPage() {
  const { id } = useParams(); 
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/achievements/all')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          const filteredData = result.data.filter((item: any) => 
            item?.achievement_category?.toLowerCase() === id?.toLowerCase()
          );
          setAchievements(filteredData);
        }
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const handleDelete = async (deleteId: string) => {
    if (window.confirm("⚠️ Are you sure you want to DELETE this entry permanently?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/achievements/delete/${deleteId}`, { method: 'DELETE' });
        if (response.ok) {
          alert("🗑️ Entry deleted successfully!");
          setAchievements(achievements.filter((item: any) => item._id !== deleteId));
        }
      } catch (error) { alert("❌ Failed to delete!"); }
    }
  };

  const uniqueYears = ['All', ...Array.from(new Set(achievements.map((item: any) => item?.year).filter(Boolean)))].sort((a: any, b: any) => b - a);
  const displayedAchievements = selectedYear === 'All' ? achievements : achievements.filter((item: any) => item?.year?.toString() === selectedYear?.toString());

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 p-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white font-bold hover:text-cyan-400 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all hover:-translate-x-1">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20">
            <Calendar size={20} className="text-cyan-400" />
            <span className="font-semibold text-gray-200">Filter Year:</span>
            <select className="bg-transparent border-none outline-none font-bold text-white cursor-pointer [&>option]:text-black" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {uniqueYears.map(year => (<option key={year} value={year}>{year}</option>))}
            </select>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 capitalize mb-12 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">🏆 {id} Fame</h1>
        
        {loading ? (
          <div className="text-center text-2xl text-cyan-400 font-bold animate-pulse mt-20">Summoning {id} records... 🔮</div>
        ) : displayedAchievements.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl shadow-lg text-center border border-white/10 mt-10">
            <p className="text-2xl font-bold text-gray-400">Oops! No achievements found here yet. 🥺</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedAchievements.map((item: any) => (
              <div key={item._id} className="group relative bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl hover:-translate-y-3 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 overflow-hidden flex flex-col">
                <button onClick={() => handleDelete(item._id)} className="absolute top-4 right-4 text-red-400 hover:text-white bg-red-900/40 hover:bg-red-500 p-2 rounded-full transition-all duration-300 z-20 shadow-lg"><Trash2 size={16} /></button>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-14 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black px-3 py-1 rounded-b-lg text-sm shadow-md">{item.year || "N/A"}</div>
                
                <h2 className="text-2xl font-bold text-white capitalize mt-2 pr-10">{item.participant_name || "Unknown"}</h2>
                
                <p className="text-sm text-cyan-400 font-semibold mb-4">
                  {item.department || "Dept"} | Sem: {item.semester || "N/A"} {item.batch ? ` | Batch: ${item.batch}` : ""}
                </p>
                
                <div className="mb-5 bg-black/30 p-4 rounded-xl border border-white/5 flex-grow">
                  <h3 className="text-lg font-bold text-gray-200">{item.event_name || "Event"}</h3>
                  <p className="text-gray-400 text-sm font-medium">{item.achievement_subtype}</p>
                </div>

                <div className="flex justify-between items-center text-sm font-bold mb-6">
                  <span className="text-green-400 bg-green-900/40 border border-green-500/30 px-3 py-1 rounded-full">🥇 {item.position}</span>
                  <span className="text-purple-300 bg-purple-900/40 border border-purple-500/30 px-3 py-1 rounded-full">🌍 {item.level}</span>
                </div>

                {item.photo && (
                  <div className="mt-auto bg-black/40 rounded-xl p-3 border border-white/10 flex justify-center">
                    <img src={item.photo} alt="Winner" className="w-full h-48 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-all duration-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. ADMIN PANEL
// ----------------------------------------------------
function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const [otherSubtype, setOtherSubtype] = useState('');
  const [otherDepartment, setOtherDepartment] = useState(''); 

  const categorySubtypes: any = {
    Technical: ["Hackathon", "Coding Contest", "Web Development", "App Development", "Robotics", "Other"],
    Sports: ["Cricket", "Badminton", "Football", "Basketball", "Athletics", "Chess", "Other"],
    Cultural: ["Dancing", "Singing", "Drama / Play", "Painting / Art", "Fashion Show", "Other"],
    Academics: ["University Topper", "Research Paper Published", "Quiz Competition", "Scholarship", "Other"]
  };

  const [formData, setFormData] = useState({
    university_name: "Shobhit University",
    college_name: "School of Engineering",
    department: "CSE", 
    batch: "", 
    year: new Date().getFullYear(),
    semester: "Odd", 
    achievement_category: "Technical", 
    achievement_subtype: "Hackathon", 
    event_name: "",
    level: "National",
    position: "",
    participant_type: "Student",
    participant_name: "",
    team_or_individual: "Individual",
    date: "", 
    photo: null as any
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === "shobhit123") { setIsLoggedIn(true); } else { alert("❌ Incorrect Password!"); }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name === "achievement_category") {
      setFormData({ ...formData, achievement_category: value, achievement_subtype: categorySubtypes[value][0] });
      if(categorySubtypes[value][0] !== 'Other'){ setOtherSubtype('');}
    } else if (name === "achievement_subtype") {
       if (value !== 'Other') { setOtherSubtype(''); }
       setFormData({ ...formData, achievement_subtype: value });
    } else if (name === "department") {
       if (value !== 'Other') { setOtherDepartment(''); }
       setFormData({ ...formData, department: value });
    } else { 
       setFormData({ ...formData, [name]: value }); 
    }
  };

  const handlePhotoChange = (e: any) => { setFormData({ ...formData, photo: e.target.files[0] }); };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
        if (key === 'achievement_subtype' && formData.achievement_subtype === 'Other' && otherSubtype) {
            submitData.append(key, otherSubtype); 
        } else if (key === 'department' && formData.department === 'Other' && otherDepartment) {
            submitData.append(key, otherDepartment); 
        } else {
            submitData.append(key, formData[key as keyof typeof formData]);
        }
    });

    try {
      const response = await fetch('http://localhost:5000/api/achievements/add', { method: 'POST', body: submitData });
      if (response.ok) {
        alert("🎉 YAY! Achievement aur Photo uploaded successfully!");
        setFormData({ ...formData, event_name: "", position: "", participant_name: "", date: "", batch: "", photo: null, achievement_subtype: categorySubtypes[formData.achievement_category][0] });
        setOtherSubtype('');
        setOtherDepartment('');
      } else { alert("❌ Failed to upload!"); }
    } catch (error) { alert("❌ Server Error!"); } finally { setIsUploading(false); }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-10 font-sans overflow-hidden">
      <AnimatedBackground />

      {!isLoggedIn ? (
        <div className="relative z-10 bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700 max-w-md w-full text-center">
          <ShieldCheck size={60} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <form onSubmit={handleLogin}>
            {/* 👇 PASSWORD HINT FIXED YAHAN HAI 👇 */}
            <input type="password" placeholder="Enter Admin Password..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl p-4 text-white outline-none focus:border-green-500 mb-4 text-center md:text-left" required />
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all">Unlock Dashboard</button>
          </form>
          <Link to="/" className="block mt-6 text-gray-400 hover:text-white transition-colors text-sm">← Return to Home</Link>
        </div>
      ) : (
        <div className="relative z-10 bg-gray-800/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-700 max-w-4xl w-full">
          <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
            <h2 className="text-3xl font-bold text-green-400">Secure Upload Form 🛡️</h2>
            <button onClick={() => setIsLoggedIn(false)} className="text-red-400 hover:text-red-300 font-bold">Logout</button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="participant_name" value={formData.participant_name} placeholder="Student Name" onChange={handleChange} required className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 text-white" />
            <input type="text" name="event_name" value={formData.event_name} placeholder="Event Name" onChange={handleChange} required className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 text-white" />
            
            <div className="flex flex-col">
              <label className="text-xs text-gray-400 mb-1">Student Department</label>
              <select name="department" value={formData.department} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 font-bold text-white [&>option]:text-black">
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.department === 'Other' && (
                <input type="text" placeholder="Manually Enter Department" value={otherDepartment} onChange={(e) => setOtherDepartment(e.target.value)} required={formData.department === 'Other'} className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-cyan-500 text-cyan-300 animate-[pulse_1s_ease-in-out_1]" />
            )}

            <div className="flex flex-col">
              <label className="text-xs text-gray-400 mb-1">Semester</label>
              <select name="semester" value={formData.semester} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 font-bold text-white [&>option]:text-black">
                <option value="Odd">Odd</option>
                <option value="Even">Even</option>
              </select>
            </div>

            <input type="text" name="batch" value={formData.batch} placeholder="Batch (e.g. 2023-2027)" onChange={handleChange} required className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 text-white" />

            <div className="flex flex-col">
              <label className="text-xs text-gray-400 mb-1">Achievement Category</label>
              <select name="achievement_category" value={formData.achievement_category} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 font-bold text-cyan-300 [&>option]:text-black">
                <option value="Technical">💻 Coding & Tech</option>
                <option value="Sports">🏏 Sports</option>
                <option value="Cultural">🎭 Cultural</option>
                <option value="Academics">📚 Academics</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-400 mb-1">Select / Other Valid Sub-category</label>
              <select name="achievement_subtype" value={formData.achievement_subtype} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 font-bold text-green-300 [&>option]:text-black">
                {categorySubtypes[formData.achievement_category].map((subtype: string) => (
                  <option key={subtype} value={subtype}>{subtype}</option>
                ))}
              </select>
            </div>

            {formData.achievement_subtype === 'Other' && (
                <input type="text" placeholder="Manually Enter Sub-category / Game Name" value={otherSubtype} onChange={(e) => setOtherSubtype(e.target.value)} required={formData.achievement_subtype === 'Other'} className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-cyan-500 text-cyan-300 animate-[pulse_1s_ease-in-out_1]" />
            )}

            <input type="text" name="position" value={formData.position} placeholder="Position (e.g. Winner, 1st Prize)" onChange={handleChange} required className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 text-white" />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-green-500 text-white" />

            <div className="md:col-span-2 flex flex-col bg-gray-700 border border-gray-600 rounded-lg p-4 mt-2">
              <label className="text-sm text-green-400 font-bold mb-2">Upload Photo 📸</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} required className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-green-500 file:text-white hover:file:bg-green-600 cursor-pointer" />
            </div>

            <button type="submit" disabled={isUploading} className={`md:col-span-2 text-white font-bold py-4 rounded-xl transition-all mt-4 text-lg shadow-lg ${isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.4)]'}`}>
              {isUploading ? "⏳ Uploading to Cloud... Please wait" : "📤 Secure Upload Data & Photo"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;