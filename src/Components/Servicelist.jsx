import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X, Undo2, ChevronLeft, ChevronRight, ArrowLeft, Plus, Package, Layers, Search, Calendar, ChevronDown } from "lucide-react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

import {
    getServiceList, createService, getPkgMasters, createPkgMaster, deleteService, deletePkgMaster, updateService, updatePkgMaster
} from "../redux/action";

// ✅ Defined OUTSIDE component so they don't remount on every render
const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(2px)' }}>
            <div className="bg-white rounded-2xl shadow-2xl w-[440px] overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-800 tracking-wide">{title}</h2>
                    <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all">
                        <X size={14} />
                    </button>
                </div>
                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
};

const FormField = ({ label, children }) => (
    <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
        {children}
    </div>
);

const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder:text-gray-400";
const selectCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all";

const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full tracking-widest uppercase
        ${status?.toLowerCase() === "active"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-600 border border-red-200"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status?.toLowerCase() === "active" ? "bg-emerald-500" : "bg-red-500"}`}></span>
        {status}
    </span>
);

const Servicelist = () => {
    const [load, setLoad] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

    const { theme } = useContext(Theme);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [open, setOpen] = useState(false);
    const [upadtedstatus, setUpadtedstatus] = useState("");
    const [updatedrrn, setUpdatedrrn] = useState("");
    const [upadtedpaytmid, seUpadtedpaytmid] = useState("");
    const [updatedremarkes, setUpdatedremarkes] = useState("");
    const [currenttxnid, setCurrenttxnid] = useState("");
    const [updateload, setUpdateload] = useState(false);
    const [modelopen, setModelopen] = useState(false);
    const [createmodelopen, setCreatemodelopen] = useState(false);
    const [createmodelopenpkg, setCreatemodelopenpkg] = useState(false);
    const [ispkgserEditing, setIspkgserEditing] = useState(false);
    const [selectedpkgname, SetSelectedpkgname] = useState("")
    const [selectedserviceid, SetSelectedserviceid] = useState("")
    const [servicestatus, setServicestatus] = useState("")
    const [servicename, setServicename] = useState("")
    const [serviceid, setServiceid] = useState("")
    const [isPkgopen, setIsPkgopen] = useState(false)
    const [currentsrvid, SetCurrentsrvid] = useState("")
    const [pkgstatus, setPkgstatus] = useState("")
    const [pkgname, setPkgname] = useState("")
    const [ispkgedit, setIspkgedit] = useState(false)
    const [currentpkgid, setCurrentpkgid] = useState("")

    const isDark = theme === "dark";

    const reset = () => {
        setServicestatus("");
        setServiceid("")
        setIspkgserEditing(false)
    }

    const handelsrvEdit = (pkg) => {
        setServicename(pkg.service_name)
        setServicestatus(pkg.status)
        SetCurrentsrvid(pkg.service_id)
        setServiceid(pkg.service_id)
    }

    const handelsrvUpdate = (e) => {
        try {
            e.preventDefault()
            const updatedsrvdata = {
                service_name: servicename,
                status: servicestatus,
            }
            dispatch(updateService(currentsrvid, updatedsrvdata))
        } catch (error) {
            console.log(error);
        } finally {
            setServiceid(""), setServicename(""), setServicestatus(""), SetCurrentsrvid("")
            setIspkgserEditing(false)
            setCreatemodelopen(false)
        }
    }

    const handelsrvcreate = (e) => {
        e.preventDefault()
        try {
            const formdata = { service_name: servicename, service_id: serviceid, status: servicestatus }
            dispatch(createService(formdata, setCreatemodelopen))
        } catch (error) {
            console.log(error);
        } finally {
            setServiceid(""); setServicename(""); setServicestatus(""); setCreatemodelopen(false)
        }
    }

    const handelserviceDelete = (service_id) => { dispatch(deleteService(service_id)) }

    const handelpkgcreate = (e) => {
        e.preventDefault()
        try {
            const formdata = { pkg_name: pkgname, status: pkgstatus }
            dispatch(createPkgMaster(formdata, setCreatemodelopen))
        } catch (error) {
            console.log(error);
        } finally {
            setPkgname(""); setPkgstatus("")
        }
    }

    const handelpkgDelete = (pkg_id) => { dispatch(deletePkgMaster(pkg_id)) }

    const handelEditpkg = (pkg) => {
        setCreatemodelopenpkg(true)
        setPkgstatus(pkg.status)
        setPkgname(pkg.pkg_name)
        setIspkgedit(true)
        setCurrentpkgid(pkg.id)
    }

    const handelpkgUpdate = (e) => {
        e.preventDefault()
        try {
            const updatedpkgdata = { pkg_name: pkgname, status: pkgstatus }
            dispatch(updatePkgMaster(currentpkgid, updatedpkgdata))
        } catch (error) {
            console.log(error);
        } finally {
            setPkgname(""); setPkgstatus(""); setIspkgedit(false); setCreatemodelopenpkg(false)
        }
    }

    const serviceList = useSelector((state) => state.services.services?.data)
    const srvTotalpages = useSelector((state) => state.services.services?.totalPages)
    const srvCurrentpage = useSelector((state) => state.services.services?.page)
    const srvTotalrecord = useSelector((state) => state.services.services?.total)
    const Masters = useSelector((state) => state.pkgMasters.pkgMasters)

    useEffect(() => {
        dispatch(getServiceList(searchTerm, page, perPage, searchStatus))
        dispatch(getPkgMasters(searchTerm, page, perPage, searchStatus, dateRange.startDate, dateRange.endDate))
    }, [dispatch, searchTerm, page, perPage, searchStatus, dateRange.startDate, dateRange.endDate]);



    return (
        <div className={`w-full min-h-full flex flex-col font-[system-ui] ${isDark ? "bg-gray-950 text-gray-200" : "bg-slate-50 text-gray-800"}`}>

            {/* — Package Modal — */}
            <Modal
                open={createmodelopenpkg}
                onClose={() => { setCreatemodelopenpkg(false); setIspkgedit(false); setPkgstatus(""); setPkgname(""); }}
                title={ispkgedit ? "Edit Package" : "Create New Package"}
            >
                <form onSubmit={(e) => ispkgedit ? handelpkgUpdate(e) : handelpkgcreate(e)} className="space-y-4">
                    <FormField label="Package Name">
                        <input type="text" value={pkgname} onChange={(e) => setPkgname(e.target.value)} placeholder="Enter package name" className={inputCls} />
                    </FormField>
                    <FormField label="Status">
                        <select value={pkgstatus} onChange={(e) => setPkgstatus(e.target.value)} className={selectCls}>
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </FormField>
                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button type="button" onClick={() => { setCreatemodelopenpkg(false); setIspkgedit(false); setPkgstatus(""); setPkgname(""); }}
                            className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">
                            Cancel
                        </button>
                        <button type="submit"
                            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm">
                            {ispkgedit ? "Update Package" : "Create Package"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* — Service Modal — */}
            <Modal
                open={createmodelopen}
                onClose={() => { setCreatemodelopen(false); setServicename(""); setServiceid(""); setServicestatus(""); setIspkgserEditing(false); }}
                title={ispkgserEditing ? "Edit Service" : "Create New Service"}
            >
                <form onSubmit={(e) => ispkgserEditing ? handelsrvUpdate(e) : handelsrvcreate(e)} className="space-y-4">
                    <FormField label="Service Name">
                        <input type="text" value={servicename} onChange={(e) => setServicename(e.target.value)} placeholder="Enter service name" className={inputCls} />
                    </FormField>
                    {!ispkgserEditing && (
                        <FormField label="Service ID">
                            <input type="text" value={serviceid} onChange={(e) => setServiceid(e.target.value)} placeholder="Enter service ID" className={inputCls} />
                        </FormField>
                    )}
                    <FormField label="Status">
                        <select value={servicestatus} onChange={(e) => setServicestatus(e.target.value)} className={selectCls}>
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </FormField>
                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button type="button" onClick={() => { setCreatemodelopen(false); setServicename(""); setServiceid(""); setServicestatus(""); setIspkgserEditing(false); }}
                            className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">
                            Cancel
                        </button>
                        <button type="submit"
                            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm">
                            {ispkgserEditing ? "Update Service" : "Create Service"}
                        </button>
                    </div>
                </form>
            </Modal>

            <main className="flex-1 flex flex-col p-6 gap-5">

                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isPkgopen && (
                            <button onClick={() => setIsPkgopen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-all shadow-sm">
                                <ArrowLeft size={15} />
                            </button>
                        )}
                        <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPkgopen ? "bg-amber-100" : "bg-indigo-100"}`}>
                                {isPkgopen ? <Package size={16} className="text-amber-600" /> : <Layers size={16} className="text-indigo-600" />}
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-gray-900 leading-tight">{isPkgopen ? "Package List" : "Service List"}</h1>
                                <p className="text-[11px] text-gray-400">{isPkgopen ? "Manage your packages" : "Manage your services"}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => isPkgopen ? setCreatemodelopenpkg(true) : setCreatemodelopen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm transition-all"
                    >
                        <Plus size={13} />
                        {isPkgopen ? "New Package" : "New Service"}
                    </button>
                </div>

                {/* Table Card */}
                <div className={`flex-1 flex flex-col rounded-2xl border overflow-hidden shadow-sm
                    ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>

                    {/* Toolbar */}
                    <div className={`flex flex-wrap items-center gap-3 px-5 py-3.5 border-b ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-gray-50/80"}`}>
                        {/* Search */}
                        <div className="relative flex-1 min-w-[200px] max-w-xs">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={isPkgopen ? "Search packages…" : "Search services…"}
                                className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none transition-all
                                    ${isDark
                                        ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-indigo-500"
                                        : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"}`}
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                onChange={(e) => setSearchStatus(e.target.value)}
                                value={searchStatus}
                                className={`appearance-none pl-3 pr-7 py-2 text-xs rounded-lg border outline-none transition-all cursor-pointer
                                    ${isDark
                                        ? "bg-gray-800 border-gray-700 text-gray-200"
                                        : "bg-white border-gray-200 text-gray-700 focus:border-indigo-400"}`}
                            >
                                <option value="">All Status</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Date Filter (pkg only) */}
                        {isPkgopen && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                    className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border transition-all
                                        ${dateRange.startDate
                                            ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium"
                                            : isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}
                                >
                                    <Calendar size={12} />
                                    {dateRange.startDate && dateRange.endDate
                                        ? `${dateRange.startDate} → ${dateRange.endDate}`
                                        : "Date Range"}
                                </button>
                                {(dateRange.startDate || dateRange.endDate) && (
                                    <button
                                        onClick={() => setDateRange({ startDate: null, endDate: null })}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all bg-white"
                                    >
                                        <Undo2 size={12} />
                                    </button>
                                )}
                            </div>
                        )}

                        {showDatePicker && (
                            <div className="absolute top-[160px] right-[5%] z-50 bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
                                <DateRange
                                    ranges={[{
                                        startDate: dateRange.startDate ? new Date(dateRange.startDate) : new Date(),
                                        endDate: dateRange.endDate ? new Date(dateRange.endDate) : new Date(),
                                        key: "selection",
                                    }]}
                                    moveRangeOnFirstSelection={false}
                                    onChange={(ranges) => {
                                        const start = ranges.selection.startDate.toLocaleDateString("en-CA");
                                        const end = ranges.selection.endDate.toLocaleDateString("en-CA");
                                        setDateRange({ startDate: start, endDate: end });
                                        setShowDatePicker(false);
                                        setPage(1);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto flex-1">
                        {isPkgopen ? (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className={`text-[10px] uppercase tracking-widest font-semibold ${isDark ? "bg-gray-800/60 text-gray-400" : "bg-gray-50 text-gray-400"} border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                                        <th className="px-5 py-3 text-left">ID</th>
                                        <th className="px-5 py-3 text-left">Package Name</th>
                                        <th className="px-5 py-3 text-left">Status</th>
                                        <th className="px-5 py-3 text-left">Created On</th>
                                        <th className="px-5 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                {load ? (
                                    <tbody><tr><td colSpan="5" className="py-16 text-center">
                                        <div className="flex justify-center"><div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div></div>
                                    </td></tr></tbody>
                                ) : (
                                    <tbody className="divide-y divide-gray-100">
                                        {Array.isArray(Masters) && Masters.length > 0 ? Masters.map((pkg, i) => (
                                            <tr key={i} className={`transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-slate-50/80"}`}>
                                                <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-400"}`}>{pkg.id}</td>
                                                <td className={`px-5 py-3.5 text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>{pkg.pkg_name}</td>
                                                <td className="px-5 py-3.5"><StatusBadge status={pkg.status} /></td>
                                                <td className={`px-5 py-3.5 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{pkg.create_on}</td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => { setIsPkgopen(true); navigate(`/dashboard/commercial/${pkg.id}/${selectedserviceid}`) }}
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-all">
                                                            <FaEdit size={10} /> Set Commercial
                                                        </button>
                                                        <button onClick={() => handelEditpkg(pkg)}
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all">
                                                            <FaEdit size={10} /> Edit
                                                        </button>
                                                        <button onClick={() => handelpkgDelete(pkg.id)}
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all">
                                                            <FaTrashAlt size={10} /> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5" className="py-16 text-center text-sm text-gray-400">No packages found</td></tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className={`text-[10px] uppercase tracking-widest font-semibold ${isDark ? "bg-gray-800/60 text-gray-400" : "bg-gray-50 text-gray-400"} border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                                        <th className="px-5 py-3 text-left">#</th>
                                        <th className="px-5 py-3 text-left">Service Name</th>
                                        <th className="px-5 py-3 text-left">Service ID</th>
                                        <th className="px-5 py-3 text-left">Status</th>
                                        <th className="px-5 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                {load ? (
                                    <tbody><tr><td colSpan="5" className="py-16 text-center">
                                        <div className="flex justify-center"><div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div></div>
                                    </td></tr></tbody>
                                ) : (
                                    <tbody className="divide-y divide-gray-100">
                                        {Array.isArray(serviceList) && serviceList.length > 0 ? serviceList.map((pkg, i) => (
                                            <tr key={i} className={`transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-slate-50/80"}`}>
                                                <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-400"}`}>{i + 1}</td>
                                                <td className={`px-5 py-3.5 text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>{pkg.service_name}</td>
                                                <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>{pkg.service_id}</td>
                                                <td className="px-5 py-3.5"><StatusBadge status={pkg.status} /></td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => { setIsPkgopen(true); SetSelectedserviceid(pkg.service_id) }}
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-lg transition-all">
                                                            <Package size={10} /> Set Package
                                                        </button>
                                                        <button onClick={() => { setIspkgserEditing(true); setCreatemodelopen(true); handelsrvEdit(pkg) }}
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all">
                                                            <FaEdit size={10} /> Edit
                                                        </button>
                                                        <button onClick={() => handelserviceDelete(pkg.service_id)}
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all">
                                                            <FaTrashAlt size={10} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5" className="py-16 text-center text-sm text-gray-400">No services found</td></tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        )}
                    </div>

                    {/* Pagination */}
                    {srvTotalpages > 0 && (
                        <div className={`flex items-center justify-between px-5 py-3 border-t text-xs
                            ${isDark ? "border-gray-800 bg-gray-900 text-gray-400" : "border-gray-100 bg-gray-50/80 text-gray-500"}`}>
                            <div className="flex items-center gap-2">
                                <span>Rows per page:</span>
                                <select
                                    value={perPage}
                                    onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                                    className={`rounded-md border px-2 py-1 text-xs outline-none transition-all
                                        ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">
                                    {(page - 1) * perPage + 1}–{Math.min(page * perPage, srvTotalrecord)} of {srvTotalrecord}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                        className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                                            ${page === 1
                                                ? "opacity-40 cursor-not-allowed border-gray-200"
                                                : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white hover:border-gray-300"}`}
                                    >
                                        <ChevronLeft size={13} />
                                    </button>
                                    {Array.from({ length: 3 }, (_, i) => page + i).map((num) =>
                                        num <= srvTotalpages && (
                                            <button key={num} onClick={() => setPage(num)}
                                                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all border
                                                    ${num === page
                                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                                        : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}
                                            >{num}</button>
                                        )
                                    )}
                                    <button
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === srvTotalpages}
                                        className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                                            ${page === srvTotalpages
                                                ? "opacity-40 cursor-not-allowed border-gray-200"
                                                : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white hover:border-gray-300"}`}
                                    >
                                        <ChevronRight size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Servicelist;