import React, { useState, useEffect } from "react";
import Layout from "@/components/LayoutDashboardSuperUser";
import DataTable from "@/components/Datatable";
import { API_URL } from "@/config/index";

const ParticipantManagement = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch participant data
    useEffect(() => {
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {
        try {
            setLoading(true);
            // Replace with your actual API endpoint
            const response = await fetch(`${API_URL}/api/participants`);
            const data = await response.json();
            setParticipants(data.data || data);
        } catch (error) {
            console.error('Error fetching participants:', error);
            // Sample data for development
            setParticipants(sampleParticipantData);
        } finally {
            setLoading(false);
        }
    };

    // Sample data structure for participants
    const sampleParticipantData = [
        {
            id: 1,
            name: "Andi Wijaya",
            email: "andi.wijaya@email.com",
            phone: "081234567890",
            department: "IT",
            position: "Network Engineer",
            trainingTitle: "Network Fundamentals",
            enrolledAt: "2025-01-10T08:00:00Z",
            progress: 85,
            status: "active",
            completedModules: 5,
            totalModules: 6,
            lastActive: "2025-01-15T10:30:00Z"
        },
        {
            id: 2,
            name: "Budi Santoso",
            email: "budi.santoso@email.com",
            phone: "081298765432",
            department: "Quality",
            position: "QC Analyst",
            trainingTitle: "Quality Control Procedures",
            enrolledAt: "2025-01-12T09:00:00Z",
            progress: 60,
            status: "active",
            completedModules: 3,
            totalModules: 5,
            lastActive: "2025-01-14T09:00:00Z"
        },
        {
            id: 3,
            name: "Citra Dewi",
            email: "citra.dewi@email.com",
            phone: "081212345678",
            department: "Safety",
            position: "Safety Officer",
            trainingTitle: "Safety Protocols",
            enrolledAt: "2024-12-01T10:00:00Z",
            progress: 100,
            status: "completed",
            completedModules: 4,
            totalModules: 4,
            lastActive: "2025-01-05T12:15:00Z"
        }
    ];

    // Define columns for the DataTable
    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (value, item) => (
                <div>
                    <div className="font-medium text-gray-900">{value}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                        {item.email}
                    </div>
                </div>
            )
        },
        {
            key: 'department',
            label: 'Department',
            sortable: true,
            render: (value, item) => (
                <div>
                    <div>{value}</div>
                    <div className="text-xs text-gray-500">{item.position}</div>
                </div>
            )
        },
        {
            key: 'trainingTitle',
            label: 'Training Program',
            sortable: true
        },
        {
            key: 'progress',
            label: 'Progress',
            sortable: true,
            render: (value, item) => (
                <div className="text-sm">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{value}%</span>
                        <span className="text-xs text-gray-500">
                            {item.completedModules}/{item.totalModules}
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
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value) => {
                const colors = {
                    'active': 'bg-green-100 text-green-800',
                    'completed': 'bg-blue-100 text-blue-800',
                    'inactive': 'bg-gray-100 text-gray-800'
                };
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </span>
                );
            }
        },
        {
            key: 'enrolledAt',
            label: 'Enrolled At',
            type: 'date',
            sortable: true,
            render: (value) => new Date(value).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        },
        {
            key: 'lastActive',
            label: 'Last Active',
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
                { value: 'Safety Protocols', label: 'Safety Protocols' }
            ]
        },
        {
            key: 'department',
            label: 'Department',
            options: [
                { value: 'IT', label: 'IT' },
                { value: 'Quality', label: 'Quality' },
                { value: 'Safety', label: 'Safety' }
            ]
        },
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Completed' },
                { value: 'inactive', label: 'Inactive' }
            ]
        }
    ];

    // Handler functions
    const handleAddParticipant = () => {
        console.log('Add new participant');
        // Navigate to add participant form or open modal
    };

    const actions = [
        {
            label: 'Add New Participant',
            onClick: handleAddParticipant,
            className: 'bg-blue-600 text-white hover:bg-blue-700'
        },
    ];

    const handleEditParticipant = (participant) => {
        console.log('Edit participant:', participant);
        // Navigate to edit form or open edit modal
    };

    const handleDeleteParticipant = async (participant) => {
        if (window.confirm(`Are you sure you want to delete "${participant.name}"?`)) {
            try {
                // Replace with your actual delete API endpoint
                await fetch(`${API_URL}/api/participants/${participant.id}`, {
                    method: 'DELETE'
                });
                fetchParticipants();
                console.log('Participant deleted:', participant.name);
            } catch (error) {
                console.error('Error deleting participant:', error);
                alert('Failed to delete participant');
            }
        }
    };

    const handleViewParticipant = (participant) => {
        console.log('View participant details:', participant);
        // Navigate to detail page or open detail modal
    };

    const handleSelectionChange = (selectedIds) => {
        console.log('Selected participant IDs:', selectedIds);
        // Handle bulk operations
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Participant Management</h1>
                    <p className="text-gray-600">Manage training participants</p>
                </div>
                <DataTable
                    data={participants}
                    columns={columns}
                    title="Training Participants"
                    searchable={true}
                    sortable={true}
                    pagination={true}
                    itemsPerPage={10}
                    actions={actions}
                    onEdit={handleEditParticipant}
                    onDelete={handleDeleteParticipant}
                    onView={handleViewParticipant}
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

export default ParticipantManagement;
