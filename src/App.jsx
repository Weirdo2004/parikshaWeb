import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Search, 
  Users, 
  FileText, 
  Activity, 
  ClipboardList, 
  Moon, 
  Sun,
  BookOpen,
  Calendar,
  BarChart2,
  Database,
  Video
} from "lucide-react";

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily: 'Arial, sans-serif'
  },
  sidebar: {
    width: '250px',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  statIcon: {
    marginRight: '15px',
    color: '#4a5568',
  },
  searchInput: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #e2e8f0',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '800px',
    maxHeight: '80%',
    overflowY: 'auto',
  },
  sidebarButton: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
  },
  modalTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f0f4f8',
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
  }
};

const stats = [
  { 
    id: 1, 
    label: "Total Students", 
    value: 60, 
    icon: Users, 
    color: '#3182ce' 
  },
  { 
    id: 2, 
    label: "Total Tests", 
    value: 10, 
    icon: FileText, 
    color: '#48bb78' 
  },
  { 
    id: 3, 
    label: "Average Score", 
    value: "78%", 
    icon: Activity, 
    color: '#ecc94b' 
  },
];

const performanceData = [
  { 
    name: "Jan", 
    passed: 30, 
    failed: 10,
    averageScore: 75,
    attendance: 85 
  },
  { 
    name: "Feb", 
    passed: 40, 
    failed: 15,
    averageScore: 80,
    attendance: 88 
  },
  { 
    name: "Mar", 
    passed: 50, 
    failed: 20,
    averageScore: 82,
    attendance: 90 
  },
  { 
    name: "Apr", 
    passed: 45, 
    failed: 25,
    averageScore: 78,
    attendance: 86 
  },
];

const studentData = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@example.com", 
    grade: "12th", 
    totalTests: 5, 
    averageScore: 85 
  },
  { 
    id: 2, 
    name: "Emma Smith", 
    email: "emma.smith@example.com", 
    grade: "11th", 
    totalTests: 4, 
    averageScore: 92 
  },
  { 
    id: 3, 
    name: "Michael Johnson", 
    email: "michael.johnson@example.com", 
    grade: "10th", 
    totalTests: 6, 
    averageScore: 78 
  },
  { 
    id: 4, 
    name: "Sarah Williams", 
    email: "sarah.williams@example.com", 
    grade: "12th", 
    totalTests: 5, 
    averageScore: 88 
  },
  { 
    id: 5, 
    name: "David Brown", 
    email: "david.brown@example.com", 
    grade: "11th", 
    totalTests: 3, 
    averageScore: 95 
  }
];

const testData = [
  { 
    id: 1, 
    name: "Mathematics Midterm", 
    subject: "Mathematics",
    totalStudents: 50, 
    averageScore: 75, 
    date: "2024-03-15",
    difficulty: "Medium"
  },
  { 
    id: 2, 
    name: "Science Final", 
    subject: "Science",
    totalStudents: 45, 
    averageScore: 82, 
    date: "2024-04-20",
    difficulty: "Hard"
  },
  { 
    id: 3, 
    name: "English Comprehension", 
    subject: "English",
    totalStudents: 40, 
    averageScore: 70, 
    date: "2024-02-10",
    difficulty: "Easy"
  },
  { 
    id: 4, 
    name: "History Exam", 
    subject: "History",
    totalStudents: 35, 
    averageScore: 68, 
    date: "2024-01-25",
    difficulty: "Medium"
  },
  { 
    id: 5, 
    name: "Physics Quiz", 
    subject: "Physics",
    totalStudents: 30, 
    averageScore: 76, 
    date: "2024-04-05",
    difficulty: "Hard"
  }
];

// New dummy student video data
const studentVideoData = [
  { 
    id: 1, 
    name: "John Doe", 
    grade: "12th", 
    testName: "Mathematics Midterm",
    videoUrl: "/api/placeholder/300/200",
    status: "In Progress",
    score: 85
  },
  { 
    id: 2, 
    name: "Emma Smith", 
    grade: "11th", 
    testName: "Science Final",
    videoUrl: "/api/placeholder/300/200",
    status: "Completed",
    score: 92
  },
  { 
    id: 3, 
    name: "Michael Johnson", 
    grade: "10th", 
    testName: "English Comprehension",
    videoUrl: "/api/placeholder/300/200",
    status: "Not Started",
    score: 0
  },
  { 
    id: 4, 
    name: "Sarah Williams", 
    grade: "12th", 
    testName: "History Exam",
    videoUrl: "/api/placeholder/300/200",
    status: "In Progress",
    score: 75
  },
  { 
    id: 5, 
    name: "David Brown", 
    grade: "11th", 
    testName: "Physics Quiz",
    videoUrl: "/api/placeholder/300/200",
    status: "Completed",
    score: 88
  },
  { 
    id: 6, 
    name: "Olivia Garcia", 
    grade: "10th", 
    testName: "Mathematics Midterm",
    videoUrl: "/api/placeholder/300/200",
    status: "In Progress",
    score: 65
  },
  { 
    id: 7, 
    name: "Ethan Kim", 
    grade: "12th", 
    testName: "Science Final",
    videoUrl: "/api/placeholder/300/200",
    status: "Completed",
    score: 90
  },
  { 
    id: 8, 
    name: "Sophia Lee", 
    grade: "11th", 
    testName: "English Comprehension",
    videoUrl: "/api/placeholder/300/200",
    status: "In Progress",
    score: 80
  },
  { 
    id: 9, 
    name: "Noah Martinez", 
    grade: "10th", 
    testName: "History Exam",
    videoUrl: "/api/placeholder/300/200",
    status: "Not Started",
    score: 0
  },
  { 
    id: 10, 
    name: "Isabella Wong", 
    grade: "12th", 
    testName: "Physics Quiz",
    videoUrl: "/api/placeholder/300/200",
    status: "Completed",
    score: 95
  }
];

// Performance data for pie charts
const performanceStatusData = [
  { name: 'Completed', value: 6 },
  { name: 'In Progress', value: 3 },
  { name: 'Not Started', value: 1 }
];

const performanceScoreData = [
  { name: '90-100', value: 3 },
  { name: '80-89', value: 3 },
  { name: '70-79', value: 2 },
  { name: '60-69', value: 1 },
  { name: '0-59', value: 1 }
];

const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0'];

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [selectedPerformanceGraph, setSelectedPerformanceGraph] = useState('passed');
  const [currentView, setCurrentView] = useState('dashboard');

  const darkModeStyles = {
    ...styles,
    container: {
      ...styles.container,
      backgroundColor: isDarkMode ? '#1a202c' : '#f0f4f8',
      color: isDarkMode ? 'white' : 'black',
    },
    sidebar: {
      ...styles.sidebar,
      backgroundColor: isDarkMode ? '#2d3748' : 'white',
    },
    statCard: {
      ...styles.statCard,
      backgroundColor: isDarkMode ? '#2d3748' : 'white',
    },
    chartContainer: {
      ...styles.chartContainer,
      backgroundColor: isDarkMode ? '#2d3748' : 'white',
    },
    modalContent: {
      ...styles.modalContent,
      backgroundColor: isDarkMode ? '#2d3748' : 'white',
    }
  };

  const currentStyles = isDarkMode ? darkModeStyles : styles;

  const performanceGraphs = [
    { 
      key: 'passed', 
      label: 'Passed vs Failed', 
      lines: [
        { key: 'passed', color: '#4CAF50', label: 'Passed' },
        { key: 'failed', color: '#F44336', label: 'Failed' }
      ]
    },
    { 
      key: 'averageScore', 
      label: 'Average Score', 
      lines: [
        { key: 'averageScore', color: '#2196F3', label: 'Average Score' }
      ]
    },
    { 
      key: 'attendance', 
      label: 'Attendance', 
      lines: [
        { key: 'attendance', color: '#FF9800', label: 'Attendance' }
      ]
    }
  ];

  const openModal = (type) => {
    setSelectedModal(type);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const renderModal = () => {
    if (!selectedModal) return null;

    switch (selectedModal) {
      case 'tests':
        return (
          <div style={styles.modalOverlay} onClick={closeModal}>
            <div 
              style={currentStyles.modalContent} 
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: '20px' }}>All Tests</h2>
              <table style={styles.modalTable}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Test Name</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Subject</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Total Students</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Average Score</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {testData.map((test) => (
                    <tr key={test.id} style={styles.tableRow}>
                      <td style={{ padding: '10px' }}>{test.name}</td>
                      <td style={{ padding: '10px' }}>{test.subject}</td>
                      <td style={{ padding: '10px' }}>{test.totalStudents}</td>
                      <td style={{ padding: '10px' }}>{test.averageScore}%</td>
                      <td style={{ padding: '10px' }}>{test.date}</td>
                      <td style={{ padding: '10px' }}>{test.difficulty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'students':
        return (
          <div style={styles.modalOverlay} onClick={closeModal}>
            <div 
              style={currentStyles.modalContent} 
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: '20px' }}>Total Students Overview</h2>
              <table style={styles.modalTable}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Grade</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Total Tests</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Average Score</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student) => (
                    <tr key={student.id} style={styles.tableRow}>
                      <td style={{ padding: '10px' }}>{student.name}</td>
                      <td style={{ padding: '10px' }}>{student.email}</td>
                      <td style={{ padding: '10px' }}>{student.grade}</td>
                      <td style={{ padding: '10px' }}>{student.totalTests}</td>
                      <td style={{ padding: '10px' }}>{student.averageScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPerformanceChart = () => {
    const currentGraph = performanceGraphs.find(g => g.key === selectedPerformanceGraph);

    return (
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={performanceData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {currentGraph.lines.map((line) => (
            <Line 
              key={line.key}
              type="step"
              dataKey={line.key} 
              stroke={line.color} 
              strokeWidth={2}
              name={line.label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderPerformanceAnalytics = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Student Video Monitoring */}
          <div style={{
            ...currentStyles.chartContainer,
            flex: 2,
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Student Test Monitoring</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '15px' 
            }}>
              {studentVideoData.map((student) => (
                <div 
                  key={student.id} 
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src={student.videoUrl} 
                    alt={`${student.name} test video`} 
                    style={{ 
                      width: '100%', 
                      borderRadius: '10px',
                      marginBottom: '10px'
                    }} 
                  />
                  <div style={{ textAlign: 'center' }}>
                    <h3>{student.name}</h3>
                    <p>Test: {student.testName}</p>
                    <p>Status: {student.status}</p>
                    <p>Score: {student.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Status Pie Chart */}
          <div style={{
            ...currentStyles.chartContainer,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Test Status Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {performanceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Score Distribution Pie Chart */}
        <div style={{
          ...currentStyles.chartContainer,
          height: '400px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Score Distribution</h2>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={performanceScoreData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {performanceScoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            {/* Stats */}
            <div style={currentStyles.statsGrid}>
              {stats.map((stat) => (
                <div 
                  key={stat.id} 
                  style={{
                    ...currentStyles.statCard,
                    transform: 'scale(1)',
                    ':hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  onClick={() => {
                    if (stat.label === "Total Tests") openModal('tests');
                    if (stat.label === "Total Students") openModal('students');
                  }}
                >
                  <stat.icon 
                    style={{
                      ...currentStyles.statIcon,
                      color: stat.color,
                      marginRight: '15px'
                    }} 
                    size={40} 
                  />
                  <div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</p>
                    <p style={{ color: '#718096' }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Performance Chart */}
            <div 
              style={{
                ...currentStyles.chartContainer,
                marginTop: '20px',
                height: '500px'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px' 
              }}>
                <h2 style={{ fontSize: '1.25rem' }}>
                  Performance Overview
                </h2>
                <div>
                  {performanceGraphs.map((graph) => (
                    <button
                      key={graph.key}
                      onClick={() => setSelectedPerformanceGraph(graph.key)}
                      style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        backgroundColor: selectedPerformanceGraph === graph.key 
                          ? '#4299e1' 
                          : '#e2e8f0',
                        color: selectedPerformanceGraph === graph.key 
                          ? 'white' 
                          : 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      {graph.label}
                    </button>
                  ))}
                </div>
              </div>
              {renderPerformanceChart()}
            </div>
          </>
        );
      case 'ongoingTests':
        return (
          <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Ongoing Tests</h1>
            <p>List of currently running tests will be displayed here.</p>
          </div>
        );
      case 'testSchedule':
        return (
          <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Test Schedule</h1>
            <p>Detailed test schedule and upcoming exams will be shown here.</p>
          </div>
        );
      case 'performanceAnalytics':
        return renderPerformanceAnalytics();
      case 'examDatabase':
        return (
          <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Exam Database</h1>
            <p>Complete database of past exams, question papers, and related resources.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={currentStyles.container}>
      {/* Sidebar */}
      <div style={currentStyles.sidebar}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Admin Dashboard</h2>
        
        <button 
          style={{
            ...styles.sidebarButton,
            backgroundColor: currentView === 'ongoingTests' ? '#3182ce' : '#4299e1'
          }}
          onClick={() => setCurrentView('ongoingTests')}
        >
          <BookOpen style={{ marginRight: '10px' }} /> Ongoing Tests
        </button>
        
        <button 
          style={{
            ...styles.sidebarButton,
            backgroundColor: currentView === 'testSchedule' ? '#3182ce' : '#4299e1'
          }}
          onClick={() => setCurrentView('testSchedule')}
        >
          <Calendar style={{ marginRight: '10px' }} /> Test Schedule
        </button>
        
        <button 
          style={{
            ...styles.sidebarButton,
            backgroundColor: currentView === 'performanceAnalytics' ? '#3182ce' : '#4299e1'
          }}
          onClick={() => setCurrentView('performanceAnalytics')}
        >
          <BarChart2 style={{ marginRight: '10px' }} /> Performance Analytics
        </button>
        
        <button 
          style={{
            ...styles.sidebarButton,
            backgroundColor: currentView === 'examDatabase' ? '#3182ce' : '#4299e1'
          }}
          onClick={() => setCurrentView('examDatabase')}
        >
          <Database style={{ marginRight: '10px' }} /> Exam Database
        </button>
        
        <button 
          style={{
            ...styles.sidebarButton,
            backgroundColor: currentView === 'dashboard' ? '#3182ce' : '#4299e1'
          }}
          onClick={() => setCurrentView('dashboard')}
        >
          <ClipboardList style={{ marginRight: '10px' }} /> Dashboard
        </button>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            ...styles.sidebarButton,
            backgroundColor: '#718096',
          }}
        >
          {isDarkMode ? <Sun style={{ marginRight: '10px' }} /> : <Moon style={{ marginRight: '10px' }} />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      
      {/* Main Content */}
      <div style={currentStyles.mainContent}>
        {/* Header */}
        <div style={currentStyles.header}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {currentView === 'dashboard' && 'Dashboard'}
            {currentView === 'ongoingTests' && 'Ongoing Tests'}
            {currentView === 'testSchedule' && 'Test Schedule'}
            {currentView === 'performanceAnalytics' && 'Performance Analytics'}
            {currentView === 'examDatabase' && 'Exam Database'}
          </h1>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              style={currentStyles.searchInput}
            />
            <Search 
              style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#718096'
              }} 
            />
          </div>
        </div>
        
        {renderContent()}
      </div>

      {/* Modals */}
      {renderModal()}
    </div>
  );
};

export default Dashboard;