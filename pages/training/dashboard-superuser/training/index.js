import React, { useState, useEffect } from "react";
import Layout from "@/components/LayoutDashboardSuperUser";
import DataTable from "@/components/Datatable";
import { API_URL } from "@/config/index";

const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch training data
  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`${API_URL}/api/trainings`);
      const data = await response.json();
      setTrainings(data.data || data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
      // Sample data for development
      setTrainings(sampleTrainingData);
    } finally {
      setLoading(false);
    }
  };

  // Sample data structure for training
  const sampleTrainingData = [
    {
      id: 1,
      title: "Network Fundamentals",
      description: "Basic networking concepts and protocols",
      category: "IT",
      instructor: "John Smith",
      duration: 40,
      level: "Beginner",
      status: "active",
      enrolled: 25,
      maxParticipants: 30,
      startDate: "2025-02-01",
      endDate: "2025-02-15",
      createdAt: "2025-01-15T10:00:00Z",
    },
    {
      id: 2,
      title: "Quality Control Procedures",
      description: "Standard quality control processes and methodologies",
      category: "Production",
      instructor: "Jane Doe",
      duration: 60,
      level: "Intermediate",
      status: "pending",
      enrolled: 18,
      maxParticipants: 25,
      startDate: "2025-02-10",
      endDate: "2025-03-10",
      createdAt: "2025-01-16T09:00:00Z",
    },
    {
      id: 3,
      title: "Safety Protocols",
      description: "Workplace safety guidelines and emergency procedures",
      category: "Safety",
      instructor: "Mike Johnson",
      duration: 30,
      level: "Beginner",
      status: "completed",
      enrolled: 45,
      maxParticipants: 50,
      startDate: "2025-01-01",
      endDate: "2025-01-20",
      createdAt: "2025-01-01T08:00:00Z",
    },
    {
      id: 4,
      title: "Advanced Data Analysis",
      description: "Statistical analysis and data visualization techniques",
      category: "Analytics",
      instructor: "Sarah Wilson",
      duration: 80,
      level: "Advanced",
      status: "inactive",
      enrolled: 12,
      maxParticipants: 20,
      startDate: "2025-03-01",
      endDate: "2025-04-15",
      createdAt: "2025-01-18T11:00:00Z",
    },
  ];

  // Define columns for the DataTable
  const columns = [
    {
      key: "title",
      label: "Training Title",
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {item.description}
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      ),
    },
    {
      key: "instructor",
      label: "Instructor",
      sortable: true,
    },
    {
      key: "level",
      label: "Level",
      sortable: true,
      render: (value) => {
        const colors = {
          Beginner: "bg-green-100 text-green-800",
          Intermediate: "bg-yellow-100 text-yellow-800",
          Advanced: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              colors[value] || "bg-gray-100 text-gray-800"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "enrolled",
      label: "Participants",
      sortable: true,
      render: (value, item) => (
        <div className="text-sm">
          <div className="font-medium">
            {value}/{item.maxParticipants}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(value / item.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      sortable: true,
      render: (value) => `${value} hours`,
    },
    {
      key: "status",
      label: "Status",
      type: "status",
      sortable: true,
      render: (value) => {
        const colors = {
          active: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          completed: "bg-blue-100 text-blue-800",
          inactive: "bg-gray-100 text-gray-800",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              colors[value] || "bg-gray-100 text-gray-800"
            }`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      key: "startDate",
      label: "Start Date",
      type: "date",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString("id-ID"),
    },
  ];

  // Define filters
  const filters = [
    {
      key: "category",
      label: "Category",
      options: [
        { value: "IT", label: "IT" },
        { value: "Production", label: "Production" },
        { value: "Safety", label: "Safety" },
        { value: "Analytics", label: "Analytics" },
        { value: "HR", label: "Human Resources" },
      ],
    },
    {
      key: "level",
      label: "Level",
      options: [
        { value: "Beginner", label: "Beginner" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Advanced", label: "Advanced" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  // Define actions

  // Handler functions
  const handleAddTraining = () => {
    console.log("Add new training");
    // Navigate to add training form or open modal
    // router.push('/training/dashboard-superuser/training/add');
  };

  const actions = [
    {
      label: "Add New Training",
      onClick: handleAddTraining,
      className: "bg-blue-600 text-white hover:bg-blue-700",
    },
  ];
  const handleImportTraining = () => {
    console.log("Import training");
    // Open import modal or navigate to import page
  };

  const handleEditTraining = (training) => {
    console.log("Edit training:", training);
    // Navigate to edit form or open edit modal
    // router.push(`/training/dashboard-superuser/training/edit/${training.id}`);
  };

  const handleDeleteTraining = async (training) => {
    if (
      window.confirm(`Are you sure you want to delete "${training.title}"?`)
    ) {
      try {
        // Replace with your actual delete API endpoint
        await fetch(`${API_URL}/api/trainings/${training.id}`, {
          method: "DELETE",
        });

        // Refresh data
        fetchTrainings();

        console.log("Training deleted:", training.title);
      } catch (error) {
        console.error("Error deleting training:", error);
        alert("Failed to delete training");
      }
    }
  };

  const handleViewTraining = (training) => {
    console.log("View training details:", training);
    // Navigate to detail page or open detail modal
    // router.push(`/training/dashboard-superuser/training/${training.id}`);
  };

  const handleSelectionChange = (selectedIds) => {
    console.log("Selected training IDs:", selectedIds);
    // Handle bulk operations
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Training Management
          </h1>
          <p className="text-gray-600">
            Manage all training programs and courses
          </p>
        </div>

        <DataTable
          data={trainings}
          columns={columns}
          title="Training Programs"
          searchable={true}
          sortable={true}
          pagination={true}
          itemsPerPage={10}
          actions={actions}
          onEdit={handleEditTraining}
          onDelete={handleDeleteTraining}
          onView={handleViewTraining}
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

export default TrainingManagement;
