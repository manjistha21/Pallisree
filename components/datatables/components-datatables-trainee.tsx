"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState, Fragment, useRef } from "react";
import sortBy from "lodash/sortBy";
import IconFile from "@/components/icon/icon-file";
import { Dialog, Transition, Tab } from "@headlessui/react";
import IconPrinter from "@/components/icon/icon-printer";
import IconPlus from "../icon/icon-plus";
import Link from "next/link";
import axios from "axios";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MaskedInput from "react-text-mask";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import IconXCircle from "@/components/icon/icon-x-circle";
import IconPencil from "@/components/icon/icon-pencil";
import IconBince from "@/components/icon/icon-bookmark";
import dayjs from "dayjs";

const MySwal = withReactContent(Swal);

const showMessage8 = () => {
  MySwal.fire({
    title: "You can upload only one file or remove the last uploaded file",
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true,
  });
};

const initialRowData = [
  {
    id: "989",
    image: "iweiofthuji",
    sportstype: "cricket",
    name: "Caroline",
    fathersname: "John",
    guardiansname: "Rahul",
    guardiansoccupation: "Service",
    gender: "Female",
    address: "kolkata",
    phoneno: "123456",
    date: "2004-05-28",
    nameoftheschool: "ABC",
    bloodgroup: "O+",
    document: "likgjrtdk",
  },
];

const col = [
  "id",
  "image",
  "sportstype",
  "name",
  "fathersname",
  "guardiansname",
  "guardiansoccupation",
  "gender",
  "address",
  "phoneno",
  "date",
  "nameoftheschool",
  "bloodgroup",
  "document",
];

const Genders = [
  "Female",
  "Male",
];

const Sports = [
  "Cricket",
  "Football",
];

const ComponentsDatatablesTrainee = () => {
  const [file, setFile] = useState(null);
  const [documentfile, setDocumentFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const [date1, setDate1] = useState<any>("2022-07-05");
  const [modal1, setModal1] = useState(false);

  const fileInputRef = useRef(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(
    sortBy(initialRowData, "id")
  );
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [customerData, setCustomerData] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [hiddenFileName, setHiddenFileName] = useState("");
  const [recordsDatasort, setRecordsDatashort] = useState("dsc");
  const [modal2, setModal2] = useState(false);
  const [editid, setEditid] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sportstypeFilter, setSportstypeFilter] = useState("");

  const newDocumnetadded = () => {
    MySwal.fire({
      title: "New Trainee has been added",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true,
    });
  };

  const updatedTrainee = () => {
    MySwal.fire({
      title: "Trainee has been updated",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true,
    });
  };

  const deletedtrainee = () => {
    MySwal.fire({
      title: "Trainee has been deleted",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true,
    });
  };

  interface Trainee {
    id: string;
    sportstype: string;
    name: string;
    fathersname: string;
    guardiansname: string;
    guardiansoccupation: string;
    gender: string;
    address: string;
    phoneno: string;
    date: string;
    nameoftheschool: string;
    bloodgroup: string;
  }

  const handleDeleteClick = (value: any) => {
    setModal2(true);
    setDeleteid(value);
  };

  const fetchTraineeData = async () => {
    try {
      const response = await fetch("/api/studentform");
      if (!response.ok) {
        throw new Error("Failed to fetch trainee data");
      }
      const data = await response.json();

      const formattedTrainee = data.studentforms.map((trainee: Trainee) => ({
        id: trainee._id,
        image: trainee.image,
        sportstype: trainee.sportstype,
        name: trainee.name,
        fathersname: trainee.fathersname,
        guardiansname: trainee.guardiansname,
        guardiansoccupation: trainee.guardiansoccupation,
        gender: trainee.gender,
        address: trainee.address,
        phoneno: trainee.phoneno,
        date: trainee.date,
        nameoftheschool: trainee.nameoftheschool,
        bloodgroup: trainee.bloodgroup,
        document: trainee.document,
      }));

      setInitialRecords(formattedTrainee);
      setRecordsData(
        formattedTrainee.slice((page - 1) * pageSize, page * pageSize)
      );
      setLoading(false);
      console.log("Fetched data:", formattedTrainee);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTraineeData();
  }, []);

  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    const filteredRecords = initialRecords.filter((item: any) => {
      const itemDate = dayjs(item.date).format("YYYY-MM-DD");
      const isInDateRange =
        (!startDate || dayjs(itemDate).isAfter(startDate)) &&
        (!endDate || dayjs(itemDate).isBefore(endDate));
      const age = ageFilter
        ? Math.floor(dayjs().diff(dayjs(item.date), "year"))
        : null;
      const isAgeMatch =
        ageFilter &&
        age >= 5 &&
        age <= parseInt(ageFilter);
      const isGenderMatch = !genderFilter || item.gender === genderFilter;
      const isSportstypeMatch = !sportstypeFilter || item.sportstype === sportstypeFilter;

      return (
        (search === "" ||
          item.id.toString().includes(search.toLowerCase()) ||
          item.image.toString().includes(search.toLowerCase()) ||
          item.sportstype.toString().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.fathersname.toLowerCase().includes(search.toLowerCase()) ||
          item.guardiansname.toLowerCase().includes(search.toLowerCase()) ||
          item.guardiansoccupation
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.gender.toLowerCase().includes(search.toLowerCase()) ||
          item.address.toLowerCase().includes(search.toLowerCase()) ||
          item.phoneno.toString().includes(search.toLowerCase()) ||
          item.date.toString().includes(search.toLowerCase()) ||
          item.nameoftheschool.toString().includes(search.toLowerCase()) ||
          item.bloodgroup.toLowerCase().includes(search.toLowerCase()) ||
          item.document.toString().includes(search.toLowerCase())) &&
        isInDateRange &&
        (!ageFilter || isAgeMatch) &&
        isGenderMatch &&
        isSportstypeMatch
      );
    });

    setRecordsData(
      filteredRecords.slice((page - 1) * pageSize, page * pageSize)
    );
  }, [search, initialRecords, page, pageSize, startDate, endDate, ageFilter, genderFilter, sportstypeFilter]);

  const handleAddCustomerClick = (e: any) => {
    e.stopPropagation();
    setShowAddCustomer(!showAddCustomer);
  };

  useEffect(() => {
    const sortedData = sortBy(initialRecords, sortStatus.columnAccessor);
    const finalData =
      sortStatus.direction === "desc" ? sortedData.reverse() : sortedData;
    setRecordsData(finalData.slice((page - 1) * pageSize, page * pageSize));
  }, [sortStatus, page, pageSize, initialRecords]);

  const formatDate = (date: any) => {
    if (date) {
      return dayjs(date).format("DD/MM/YYYY");
    }
    return "";
  };

  const handleDeleteData = async () => {
    setModal2(false);

    const res = await fetch(`/api/studentform/${deleteid}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchTraineeData();
      deletedtrainee();
    }
  };

  const getcustomeval = () => {
    setEditid("");
    setFiles([]);
    setFormData({
      id: "",
      image: "",
      sportstype: "",
      name: "",
      fathersname: "",
      guardiansname: "",
      guardiansoccupation: "",
      gender:"",
      address: "",
      phoneno: "",
      date: "",
      nameoftheschool: "",
      bloodgroup: "",
      document: "",
    });
    const options = customerData.map((customer) => ({
      value: customer._id,
      label: `${customer.firstName} ${
        customer.middleName ? customer.middleName + " " : ""
      }${customer.lastName} - ${customer.mobile}`,
    }));
    setOptions(options);
    setModal1(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);

    const selectedFiles = e.target.files;
    const newFiles = Array.from(selectedFiles!);

    if (files.length + newFiles.length > 1) {
      showMessage8();
    } else {
      setFiles([...files, ...newFiles]);
      setHiddenFileName(newFiles[0].name);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleDateChange = (date: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date[0] ? date[0].toISOString().split("T")[0] : "",
    }));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setHiddenFileName("");
  };

  const exportTable = (type: any) => {
    let columns: any = col;
    let records = initialRecords;
    let filename = "table";

    let newVariable: any;
    newVariable = window.navigator;

    if (type === "csv") {
      let coldelimiter = ";";
      let linedelimiter = "\n";
      let result = columns
        .map((d: any) => {
          return capitalize(d);
        })
        .join(coldelimiter);
      result += linedelimiter;
      records.map((item: any) => {
        columns.map((d: any, index: any) => {
          if (index > 0) {
            result += coldelimiter;
          }
          let val = item[d] ? item[d] : "";
          result += val;
        });
        result += linedelimiter;
      });

      if (result == null) return;
      if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
        var data =
          "data:application/csv;charset=utf-8," + encodeURIComponent(result);
        var link = document.createElement("a");
        link.setAttribute("href", data);
        link.setAttribute("download", filename + ".csv");
        link.click();
      } else {
        var blob = new Blob([result]);
        if (newVariable.msSaveOrOpenBlob) {
          newVariable.msSaveBlob(blob, filename + ".csv");
        }
      }
    } else if (type === "print") {
      var rowhtml = "<p>" + filename + "</p>";
      rowhtml +=
        '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
      columns.map((d: any) => {
        rowhtml += "<th>" + capitalize(d) + "</th>";
      });
      rowhtml += "</tr></thead>";
      rowhtml += "<tbody>";
      records.map((item: any) => {
        rowhtml += "<tr>";
        columns.map((d: any) => {
          let val = item[d] ? item[d] : "";
          rowhtml += "<td>" + val + "</td>";
        });
        rowhtml += "</tr>";
      });
      rowhtml +=
        "<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>";
      rowhtml += "</tbody></table>";
      var winPrint: any = window.open(
        "",
        "",
        "left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0"
      );
      winPrint.document.write("<title>Print</title>" + rowhtml);
      winPrint.document.close();
      winPrint.focus();
      winPrint.print();
    } else if (type === "txt") {
      let coldelimiter = ",";
      let linedelimiter = "\n";
      let result = columns
        .map((d: any) => {
          return capitalize(d);
        })
        .join(coldelimiter);
      result += linedelimiter;
      records.map((item: any) => {
        columns.map((d: any, index: any) => {
          if (index > 0) {
            result += coldelimiter;
          }
          let val = item[d] ? item[d] : "";
          result += val;
        });
        result += linedelimiter;
      });

      if (result == null) return;
      if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
        var data1 =
          "data:application/txt;charset=utf-8," + encodeURIComponent(result);
        var link1 = document.createElement("a");
        link1.setAttribute("href", data1);
        link1.setAttribute("download", filename + ".txt");
        link1.click();
      } else {
        var blob1 = new Blob([result]);
        if (newVariable.msSaveOrOpenBlob) {
          newVariable.msSaveBlob(blob1, filename + ".txt");
        }
      }
    }
  };

  const capitalize = (text: any) => {
    return text
      .replace("_", " ")
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  const [formData, setFormData] = useState({
    id: "",
    image: "",
    sportstype: "",
    name: "",
    fathersname: "",
    guardiansname: "",
    guardiansoccupation: "",
    gender: "",
    address: "",
    phoneno: "",
    date: "",
    nameoftheschool: "",
    bloodgroup: "",
    document: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: editid,
    }));
  }, [editid]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editid) {
      let imageName = "";
      let docname = "";
      if (file) {
        const filename = file.name;
        imageName = formData.phoneno + "-" + filename;
        formData.image = imageName; // Assuming formData is an object, not FormData instance
      }

      if (documentfile) {
        const documentfilename = documentfile.name;
        docname = formData.phoneno + "-" + documentfilename;
        formData.document = docname; // Assuming formData is an object, not FormData instance
      }

      try {
        const res = await fetch("/api/studentform", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          newDocumnetadded();
          fetchTraineeData();
          setModal1(false);
          const formData = new FormData();
          if (file) {
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);
            if (documentfile) {
              uploadFormData.append("documentfile", documentfile);
              uploadFormData.append("documentfilename", docname);
            }

            uploadFormData.append("imageName", imageName);

            const res = await fetch("/api/upload", {
              method: "POST",
              body: uploadFormData,
            });
            console.log(res);
            if (res.ok) {
              alert("File uploaded successfully");
            } else {
              alert("File upload failed");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const url = `/api/studentform/${editid}`;

        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          throw new Error("failed to update trainee");
        }
        if (res.ok) {
          setModal1(false);
          fetchTraineeData();
          updatedTrainee();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateClick = async (value: any) => {
    try {
      console.log("Fetching data for ID:", value);
      const res = await fetch(`/api/studentform/${value}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data for ID: ${value}`);
      }
      const data = await res.json();
      console.log("Fetched data:", data);

      if (data && data.student) {
        setFormData({
          id: data.student._id || "",
          image: data.student._id || "",
          sportstype: data.student.sportstype || "",
          name: data.student.name || "",
          fathersname: data.student.fathersname || "",
          guardiansname: data.student.guardiansname || "",
          guardiansoccupation: data.student.guardiansoccupation || "",
          gender: data.student.gender || "",
          address: data.student.address || "",
          phoneno: data.student.phoneno || "",
          date: data.student.date ? data.student.date.split("T")[0] : "",
          nameoftheschool: data.student.nameoftheschool || "",
          bloodgroup: data.student.bloodgroup || "",
          document: data.student._id || "",
        });
        setEditid(data.student._id);
        setModal1(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setAgeFilter("");
    setGenderFilter("");
    setSportstypeFilter("");
    setSearch("");
  };

  return (
    <div className="panel mt-6">
      <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
        Trainees
      </h5>

      <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center">
          <div className="mb-5">
            <div className="flex items-center justify-center"></div>
            <Transition appear show={modal1} as={Fragment}>
              <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                  <div className="flex min-h-screen items-start justify-center px-4">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel
                        as="div"
                        className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                      >
                        <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                          <div className="text-lg font-bold">Add Trainee</div>
                          <button
                            type="button"
                            className="text-white-dark hover:text-dark"
                            onClick={() => setModal1(false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                            </svg>
                          </button>
                        </div>
                        <div className="p-5">
                          <div className="mb-5">
                            <form
                              className="space-y-5"
                              onSubmit={handleFormSubmit}
                            >
                              <div>
                                <label htmlFor="image">Upload Image</label>
                                <input
                                  id="image"
                                  type="file"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="form-input"
                                />
                              </div>

                              <div>
                                <label htmlFor="sportstype">
                                  Sports Type
                                </label>
                                <select
                                  id="sportstype"
                                  name="sportstype"
                                  className="form-select"
                                  onChange={handleChange}
                                  value={formData.sportstype}
                                >
                                  <option value="">
                                    Select Sports Type
                                  </option>
                                  {Sports.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="name">Name</label>
                                <div>
                                  <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    onChange={handleChange}
                                    className="form-input"
                                    value={formData.name}
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="fathersname">
                                  Father's Name
                                </label>
                                <input
                                  id="fathersname"
                                  type="text"
                                  name="fathersname"
                                  placeholder="Enter father's name"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.fathersname}
                                />
                              </div>
                              <div>
                                <label htmlFor="guardiansname">
                                  Guardian's Name
                                </label>
                                <input
                                  id="guardiansname"
                                  type="text"
                                  name="guardiansname"
                                  placeholder="Enter guardian's name"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.guardiansname}
                                />
                              </div>
                              <div>
                                <label htmlFor="guardiansoccupation">
                                  Guardian's Occupation
                                </label>
                                <input
                                  id="guardiansoccupation"
                                  type="text"
                                  name="guardiansoccupation"
                                  placeholder="Enter guardian's occupation"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.guardiansoccupation}
                                />
                              </div>

                              <div>
                                <label htmlFor="gender">
                                  Gender
                                </label>
                                <select
                                  id="gender"
                                  name="gender"
                                  className="form-select"
                                  onChange={handleChange}
                                  value={formData.gender}
                                >
                                  <option value="">
                                    Select Gender
                                  </option>
                                  {Genders.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="address">Address</label>
                                <input
                                  id="address"
                                  type="text"
                                  name="address"
                                  placeholder="Enter address"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.address}
                                />
                              </div>
                              <div>
                                <label htmlFor="phoneno">Phone Number</label>
                                <input
                                  id="phoneno"
                                  type="text"
                                  name="phoneno"
                                  placeholder="Enter phone number"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.phoneno}
                                />
                              </div>
                              <div>
                                <label htmlFor="date">Date</label>
                                <Flatpickr
                                  id="date"
                                  value={formData.date}
                                  options={{
                                    dateFormat: "d/m/Y",
                                    position: isRtl
                                      ? "auto right"
                                      : "auto left",
                                  }}
                                  className="form-input"
                                  onChange={handleDateChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="nameoftheschool">
                                  Name of the School
                                </label>
                                <input
                                  id="nameoftheschool"
                                  type="text"
                                  name="nameoftheschool"
                                  placeholder="Enter name of the school"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.nameoftheschool}
                                />
                              </div>
                              <div>
                                <label htmlFor="bloodgroup">Blood Group</label>
                                <input
                                  id="bloodgroup"
                                  type="text"
                                  name="bloodgroup"
                                  placeholder="Enter blood group"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.bloodgroup}
                                />
                              </div>

                              <div>
                                <label htmlFor="document">
                                  Upload Document
                                </label>
                                <input
                                  id="document"
                                  type="file"
                                  name="document"
                                  onChange={handleDocumentChange}
                                  className="form-input"
                                />
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary !mt-6"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
          <button
            type="button"
            className="btn btn-primary my-5"
            onClick={() => getcustomeval()}
          >
            <IconPlus className="ltr:mr-2 rtl:ml-2" />
            Add Trainee
          </button>
          <button
            type="button"
            onClick={() => exportTable("csv")}
            className="btn btn-primary btn-sm m-1 "
          >
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            CSV
          </button>
          <button
            type="button"
            onClick={() => exportTable("txt")}
            className="btn btn-primary btn-sm m-1"
          >
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            TXT
          </button>

          <button
            type="button"
            onClick={() => exportTable("print")}
            className="btn btn-primary btn-sm m-1"
          >
            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
            PRINT
          </button>
        </div>

        <input
          type="text"
          className="form-input w-auto"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-4">
        <Flatpickr
          options={{ dateFormat: "d/m/Y" }}
          className="form-input"
          placeholder="Start Date"
          onChange={(date) =>
            setStartDate(date[0] ? date[0].toISOString() : null)
          }
        />
        <Flatpickr
          options={{ dateFormat: "d/m/Y" }}
          className="form-input"
          placeholder="End Date"
          onChange={(date) =>
            setEndDate(date[0] ? date[0].toISOString() : null)
          }
        />
        <select
          className="form-input"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
        >
          <option value="">Select Age</option>
          {[...Array(76)].map((_, index) => (
            <option key={index + 5} value={index + 5}>
              5 - {index + 5} years
            </option>
          ))}
        </select>
        <select
          className="form-input"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">Select Gender</option>
          {Genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <select
          className="form-input"
          value={sportstypeFilter}
          onChange={(e) => setSportstypeFilter(e.target.value)}
        >
          <option value="">Select Sportstype</option>
          {Sports.map((sportstype) => (
            <option key={sportstype} value={sportstype}>
              {sportstype}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="datatables">
        <DataTable
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={recordsData}
          columns={[
            { accessor: "id", title: "#", sortable: true },
            {
              accessor: "image",
              sortable: true,
              render: (row) => (
                <div className="flex items-center gap-2">
                  <img
                    src={`/assets/trainee/${row.image}`}
                    className="h-9 w-9 max-w-none rounded-full"
                    alt=""
                  />
                </div>
              ),
            },
            { accessor: "sportstype", sortable: true },
            { accessor: "name", sortable: true },
            { accessor: "fathersname", sortable: true },
            { accessor: "guardiansname", sortable: true },
            { accessor: "guardiansoccupation", sortable: true },
            { accessor: "gender", sortable: true },
            { accessor: "address", sortable: true },
            { accessor: "phoneno", sortable: true },
            {
              accessor: "date",
              sortable: true,
              render: (row) => formatDate(row.date),
            },
            { accessor: "nameoftheschool", title: "School", sortable: true },
            { accessor: "bloodgroup", sortable: true },
            {
              accessor: "document",
              sortable: true,

              render: (row) => (
                <div className="mx-auto flex w-max items-center gap-4">
                  <Tippy content="certificate">
                    <button
                      type="button"
                      onClick={() => {
                        window.open(
                          `/assets/trainee/${row.document}`,
                          "_blank"
                        );
                      }}
                      className="btn btn-primary"
                    >
                      <IconBince />
                    </button>
                  </Tippy>
                </div>
              ),
            },
            {
              accessor: "action",
              title: "Action",
              titleClassName: "!text-center",
              render: (row) => (
                <div className="mx-auto flex w-max items-center gap-4">
                  <Tippy content="Edit Document">
                    <button
                      type="button"
                      onClick={() => handleUpdateClick(row.id)}
                      className="btn btn-primary bg-primary"
                    >
                      <IconPencil />
                    </button>
                  </Tippy>

                  <Tippy content="Delete Document">
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(row.id)}
                      className="btn btn-primary bg-red-500"
                    >
                      <IconXCircle />
                    </button>
                  </Tippy>
                </div>
              ),
            },
          ]}
          totalRecords={initialRecords.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing ${from} to ${to} of ${totalRecords} entries`
          }
        />
      </div>

      <Transition appear show={modal2} as={Fragment}>
        <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
            <div className="flex min-h-screen items-center justify-center px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="div"
                  className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                >
                  <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Delete</h5>
                    <button
                      type="button"
                      className="text-white-dark hover:text-dark"
                      onClick={() => setModal2(false)}
                    ></button>
                  </div>
                  <div className="p-5">
                    <p>Do you want to delete this Document?</p>
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => setModal2(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        onClick={() => handleDeleteData()}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ComponentsDatatablesTrainee;
