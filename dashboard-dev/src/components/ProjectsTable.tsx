'use client';

import React, { useState, useMemo } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { MdCheckCircle, MdCancel, MdPause } from 'react-icons/md';
import Card from 'components/card';
import InputField from 'components/fields/InputField';
import { projectsData, type Project, uniqueClients } from '../../mock/projects';

const columnHelper = createColumnHelper<Project>();

export default function ProjectsTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selectedClient, setSelectedClient] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filtrowanie danych
    const filteredData = useMemo(() => {
        let filtered = projectsData;

        // Filtrowanie po kliencie
        if (selectedClient !== 'all') {
            filtered = filtered.filter(project => project.client === selectedClient);
        }

        // Filtrowanie po nazwie projektu
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [selectedClient, searchTerm]);

    const columns = [
        columnHelper.accessor('name', {
            id: 'name',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">PROJECT NAME</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('client', {
            id: 'client',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">CLIENT</p>
            ),
            cell: (info) => (
                <p className="text-sm text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('status', {
            id: 'status',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>
            ),
            cell: (info) => {
                const status = info.getValue();
                const statusConfig = {
                    active: { icon: MdCheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' },
                    completed: { icon: MdCheckCircle, color: 'text-blue-500', bgColor: 'bg-blue-100' },
                    'on-hold': { icon: MdPause, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
                    cancelled: { icon: MdCancel, color: 'text-red-500', bgColor: 'bg-red-100' }
                };

                const config = statusConfig[status];
                const IconComponent = config.icon;

                return (
                    <div className="flex items-center">
                        <IconComponent className={`me-2 ${config.color}`} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    </div>
                );
            },
        }),

        columnHelper.accessor('budget', {
            id: 'budget',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">BUDGET</p>
            ),
            cell: (info) => (
                <p className="text-sm text-navy-700 dark:text-white">
                    ${info.getValue().toLocaleString()}
                </p>
            ),
        }),
        columnHelper.accessor('startDate', {
            id: 'startDate',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">START DATE</p>
            ),
            cell: (info) => (
                <p className="text-sm text-navy-700 dark:text-white">
                    {new Date(info.getValue()).toLocaleDateString()}
                </p>
            ),
        }),
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="flex flex-col gap-5">
            <h1 className="flex justify-center text-2xl text-brand-800">Projects</h1>

            {/* Filtry */}
            <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white dark:bg-navy-800 rounded-xl">
                <div className="flex-1">
                    <InputField
                        id="search"
                        label="Search Projects"
                        placeholder="Search by project name..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex-1">
                    <label className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                        Filter by Client
                    </label>
                    <select
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:border-white/10 dark:text-white"
                    >
                        <option value="all">All Clients</option>
                        {uniqueClients.map(client => (
                            <option key={client} value={client}>{client}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Tabela */}
            <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
                <div className="relative flex items-center justify-between pt-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Projects Table
                    </div>
                    <div className="text-sm text-gray-600 dark:text-white">
                        {filteredData.length} of {projectsData.length} projects
                    </div>
                </div>

                <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="!border-px !border-gray-400">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                                            >
                                                <div className="items-center justify-between text-xs text-gray-200">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: ' ↑',
                                                        desc: ' ↓',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className="min-w-[150px] border-white/0 py-3 pr-4"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}