import React, { useState, useEffect } from "react";
import Layout from "@/components/LayoutDashboardSuperUser";
import DataTable from "@/components/Datatable";
import { API_URL } from "@/config/index";

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch module data
  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`${API_URL}/api/modules`);
      const data = await response.json();
      setModules(data.data || data);
    } catch (error) {
      console.error('Error fetching modules:', error);
      // Sample data for development
      setModules(sampleModuleData);
    } finally {
      setLoading(false);
    }
  };

  // Sample data structure for modules
  const sampleModuleData = [
    {
      id: 1,
      title: "Introduction to Networking",
      description: "Basic concepts of computer networking including TCP/IP, OSI model, and network protocols",
      trainingId: 1,
      trainingTitle: "Network Fundamentals",
      order: 1,
      duration: 120, // in minutes
      type: "video",
      status: "published",
      completionRate: 85,
      totalEnrolled: 45,
      totalCompleted: 38,
      createdBy: "John Smith",
      createdAt: "2025-01-10T08:00:00Z",
      updatedAt: "2025-01-15T10:30:00Z",
      isRequired: true,
      hasQuiz: true,
      passingScore: 80
    },
    {
      id: 2,
      title: "Network Hardware Components",
      description: "Understanding routers, switches, hubs, and other networking equipment",
      trainingId: 1,
      trainingTitle: "Network Fundamentals",
      order: 2,
      duration: 90,
      type: "document",
      status: "draft",
      completionRate: 0,
      totalEnrolled: 0,
      totalCompleted: 0,
      createdBy: "John Smith",
      createdAt: "2025-01-12T09:00:00Z",
      updatedAt: "2025-01-12T09:00:00Z",
      isRequired: true,
      hasQuiz: false,
      passingScore: null
    },
    {
      id: 3,
      title: "Quality Standards Overview",
      description: "Introduction to ISO standards and quality management systems",
      trainingId: 2,
      trainingTitle: "Quality Control Procedures",
      order: 1,
      duration: 75,
      type: "interactive",
      status: "published",
      completionRate: 72,
      totalEnrolled: 25,
      totalCompleted: 18,
      createdBy: "Jane Doe",
      createdAt: "2025-01-08T14:00:00Z",
      updatedAt: "2025-01-14T16:45:00Z",
      isRequired: true,
      hasQuiz: true,
      passingScore: 75
    },
    {
      id: 4,
      title: "Statistical Process Control",
      description: "Methods for monitoring and controlling manufacturing processes",
      trainingId: 2,
      trainingTitle: "Quality Control Procedures",
      order: 2,
      duration: 150,
      type: "video",
      status: "published",
      completionRate: 68,
      totalEnrolled: 25,
      totalCompleted: 17,
      createdBy: "Jane Doe",
      createdAt: "2025-01-09T11:00:00Z",
      updatedAt: "2025-01-16T13:20:00Z",
      isRequired: false,
      hasQuiz: true,
      passingScore: 70
    },
    {
      id: 5,
      title: "Workplace Safety Fundamentals",
      description: "Basic safety principles and hazard identification",
      trainingId: 3,
      trainingTitle: "Safety Protocols",
      order: 1,
      duration: 60,
      type: "document",
      status: "archived",
      completionRate: 100,
      totalEnrolled: 50,
      totalCompleted: 50,
      createdBy: "Mike Johnson",
      createdAt: "2024-12-01T10:00:00Z",
      updatedAt: "2024-12-20T15:30:00Z",
      isRequired: true,
      hasQuiz: true,
      passingScore: 85
    },
    {
      id: 6,
      title: "Emergency Response Procedures",
      description: "Step-by-step emergency response protocols and evacuation procedures",
      trainingId: 3,
      trainingTitle: "Safety Protocols",
      order: 2,
      duration: 45,
      type: "interactive",
      status: "published",
      completionRate: 94,
      totalEnrolled: 50,
      totalCompleted: 47,
      createdBy: "Mike Johnson",
      createdAt: "2024-12-02T09:00:00Z",
      updatedAt: "2025-01-05T12:15:00Z",
      isRequired: true,
      hasQuiz: false,
      passingScore: null
    }
  ];

  // Define columns for the DataTable
  const columns = [
    {
      key: 'title',
      label: 'Module Title',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {item.description}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            {item.trainingTitle} - Module {item.order}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => {
        const colors = {
          'video': 'bg-red-100 text-red-800',
          'document': 'bg-blue-100 text-blue-800',
          'interactive': 'bg-purple-100 text-purple-800',
          'quiz': 'bg-green-100 text-green-800'
        };
        const icons = {
          'video': '▶️',
          'document': '📄',
          'interactive': '🎮',
          'quiz': '❓'
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
            <span className="mr-1">{icons[value]}</span>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
      render: (value) => {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      }
    },
    {
      key: 'completionRate',
      label: 'Completion',
      sortable: true,
      render: (value, item) => (
        <div className="text-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{value}%</span>
            <span className="text-xs text-gray-500">
              {item.totalCompleted}/{item.totalEnrolled}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                value >= 80 ? 'bg-green-500' : 
                value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'isRequired',
      label: 'Required',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
        }`}>
          {value ? '✓ Required' : 'Optional'}
        </span>
      )
    },
    {
      key: 'hasQuiz',
      label: 'Assessment',
      sortable: true,
      render: (value, item) => (
        <div className="text-sm">
          {value ? (
            <div>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                ✓ Quiz
              </span>
              {item.passingScore && (
                <div className="text-xs text-gray-500 mt-1">
                  Pass: {item.passingScore}%
                </div>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
              No Quiz
            </span>
          )}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const colors = {
          'published': 'bg-green-100 text-green-800',
          'draft': 'bg-yellow-100 text-yellow-800',
          'archived': 'bg-gray-100 text-gray-800',
          'under_review': 'bg-blue-100 text-blue-800'
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        );
      }
    },
    {
      key: 'createdBy',
      label: 'Created By',
      sortable: true
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      type: 'date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  ];

  // Define filters
  const filters = [
    {
      key: 'trainingTitle',
      label: 'Training Program',
      options: [
        { value: 'Network Fundamentals', label: 'Network Fundamentals' },
        { value: 'Quality Control Procedures', label: 'Quality Control Procedures' },
        { value: 'Safety Protocols', label: 'Safety Protocols' },
        { value: 'Advanced Data Analysis', label: 'Advanced Data Analysis' }
      ]
    },
    {
      key: 'type',
      label: 'Module Type',
      options: [
        { value: 'video', label: 'Video' },
        { value: 'document', label: 'Document' },
        { value: 'interactive', label: 'Interactive' },
        { value: 'quiz', label: 'Quiz' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'archived', label: 'Archived' },
        { value: 'under_review', label: 'Under Review' }
      ]
    },
    {
      key: 'isRequired',
      label: 'Requirement',
      options: [
        { value: 'true', label: 'Required' },
        { value: 'false', label: 'Optional' }
      ]
    }
  ];
  
  // Handler functions
  const handleAddModule = () => {
    console.log('Add new module');
    // Navigate to add module form or open modal
    // router.push('/training/dashboard-superuser/module/add');
  };
  // Define actions
  const actions = [
    {
      label: 'Add New Module',
      onClick: handleAddModule,
      className: 'bg-blue-600 text-white hover:bg-blue-700'
    },
  ];


  const handleImportModules = () => {
    console.log('Import modules');
    // Open import modal or navigate to import page
  };

  const handleBulkPublish = () => {
    console.log('Bulk publish selected modules');
    // Handle bulk publish operation
  };

  const handleEditModule = (module) => {
    console.log('Edit module:', module);
    // Navigate to edit form or open edit modal
    // router.push(`/training/dashboard-superuser/module/edit/${module.id}`);
  };

  const handleDeleteModule = async (module) => {
    if (window.confirm(`Are you sure you want to delete "${module.title}"?`)) {
      try {
        // Replace with your actual delete API endpoint
        await fetch(`${API_URL}/api/modules/${module.id}`, {
          method: 'DELETE'
        });
        
        // Refresh data
        fetchModules();
        
        console.log('Module deleted:', module.title);
      } catch (error) {
        console.error('Error deleting module:', error);
        alert('Failed to delete module');
      }
    }
  };

  const handleViewModule = (module) => {
    console.log('View module details:', module);
    // Navigate to detail page or open detail modal
    // router.push(`/training/dashboard-superuser/module/${module.id}`);
  };

  const handleDuplicateModule = async (module) => {
    try {
      const duplicatedModule = {
        ...module,
        id: Date.now(), // Temporary ID
        title: `${module.title} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Replace with your actual duplicate API endpoint
      const response = await fetch(`${API_URL}/api/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(duplicatedModule)
      });

      if (response.ok) {
        fetchModules();
        console.log('Module duplicated:', module.title);
      }
    } catch (error) {
      console.error('Error duplicating module:', error);
      alert('Failed to duplicate module');
    }
  };

  const handleSelectionChange = (selectedIds) => {
    console.log('Selected module IDs:', selectedIds);
    // Handle bulk operations
  };

  // Custom action buttons for each row
  const customActions = [
    {
      label: 'Duplicate',
      onClick: handleDuplicateModule,
      className: 'text-indigo-600 hover:text-indigo-900'
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Module Management</h1>
          <p className="text-gray-600">Manage training modules and learning content</p>
        </div>

        

        <DataTable
          data={modules}
          columns={columns}
          title="Training Modules"
          searchable={true}
          sortable={true}
          pagination={true}
          itemsPerPage={10}
          actions={actions}
          onEdit={handleEditModule}
          onDelete={handleDeleteModule}
          onView={handleViewModule}
          loading={loading}
          showRowNumbers={true}
          exportable={false}
          selectable={true}
          onSelectionChange={handleSelectionChange}
          filters={filters}
          className="shadow-lg"
        />
      </div>
    </Layout>
  );
};

export default ModuleManagement;