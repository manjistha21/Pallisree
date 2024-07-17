"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState, Fragment, useRef } from "react";
import sortBy from "lodash/sortBy";
import IconFile from "@/components/icon/icon-file";
import { Dialog, Transition } from "@headlessui/react";
import IconPrinter from "@/components/icon/icon-printer";
import IconPlus from "../icon/icon-plus";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import IconXCircle from "@/components/icon/icon-x-circle";
import IconPencil from "@/components/icon/icon-pencil";
import Select from "react-select";

const MySwal = withReactContent(Swal);


const initialRowData = [
  {
    id: "989",
    trainee: "Caroline",
    date: "2004-05-28",
    monthsSelected: ["January"],
    subscriptionType: "Monthly",
    amount: "O+",
  },
];

const col = [
  "id",
  "trainee",
  "year",
  "date",
  "monthsSelected",
  "subscriptionType",
  "amount"
];

const years = ["2024", "2025", "2026"];

const monthOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" }
];
const subscriptionOptions = [
  "Monthly",
  "Admission Fees",
  "Development Fees",
  "Donation"
];

const ComponentsDatatablesSubscription = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const [date1, setDate1] = useState<any>("2022-07-05");

  const [modal1, setModal1] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(
    sortBy(initialRowData, "id")
  );
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [customerData, setCustomerData] = useState([]);
  const [cutomerid, setcutomerid] = useState("");
  const [cutomerName, setcutomerName] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [hiddenFileName, setHiddenFileName] = useState("");
  const [recordsDatasort, setRecordsDatashort] = useState("dsc");
  const [modal2, setModal2] = useState(false);
  const [editid, setEditid] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [traineeData, setTraineeData] = useState([]);

  const newTraineeadded = () => {
    MySwal.fire({
      title: "New Subscription has been added",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true
    });
  };

  const updatedSubscription = () => {
    MySwal.fire({
      title: "Subscription has been updated",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true
    });
  };

  const deletedsubscription = () => {
    MySwal.fire({
      title: "Subscription has been deleted",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true
    });
  };

  interface Subscription {
    id: string;
    trainee: string;
    year: string;
    date: string;
    monthsSelected: string[];
    subscriptionType: string;
    amount: string;
  }

  const handleDeleteClick = (value: any) => {
    setModal2(true);
    setDeleteid(value);
  };

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch("/api/subscription");
      if (!response.ok) {
        throw new Error("Failed to fetch subscription data");
      }
      const data = await response.json();

      const formattedSubscription = data.subscriptions.map(
        (subscription: Subscription) => ({
          id: subscription._id,
          trainee: subscription.trainee,
          year: subscription.year,
          date: subscription.date,
          monthsSelected: subscription.monthsSelected,
          subscriptionType: subscription.subscriptionType,
          amount: subscription.amount
        })
      );

      setInitialRecords(formattedSubscription);
      setRecordsData(
        formattedSubscription.slice((page - 1) * pageSize, page * pageSize)
      );
      setLoading(false);
      console.log("Fetched data:", formattedSubscription);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const fetchTraineeData = async () => {
    try {
      const response = await fetch("/api/studentform");
      if (!response.ok) {
        throw new Error("Failed to fetch trainee data");
      }
      const data = await response.json();
      console.log("Fetched trainee data:", data); // Log the fetched data to see its structure
  
      // Check if the data has a studentforms property and ensure traineeData is always an array
      const trainees = Array.isArray(data.studentforms) ? data.studentforms : [];
      setTraineeData(trainees);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  
  

  useEffect(() => {
    fetchSubscriptionData();
    fetchTraineeData();
  }, []);

  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc"
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
      return (
        item.id.toString().includes(search.toLowerCase()) ||
        item.trainee.toLowerCase().includes(search.toLowerCase()) ||
        item.year.toString().includes(search.toLowerCase()) ||
        item.date.toString().includes(search.toLowerCase()) ||
        item.monthsSelected.toString().includes(search.toLowerCase()) ||
        item.subscriptionType.toLowerCase().includes(search.toLowerCase()) ||
        item.amount.toString().includes(search.toLowerCase())
      );
    });

    setRecordsData(
      filteredRecords.slice((page - 1) * pageSize, page * pageSize)
    );
  }, [search, initialRecords, page, pageSize]);

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
      const dt = new Date(date);
      const month =
        dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
      return day + "/" + month + "/" + dt.getFullYear();
    }
    return "";
  };

  const handleDeleteData = async () => {
    setModal2(false);

    const res = await fetch(
      `/api/subscription/${deleteid}`,
      {
        method: "DELETE"
      }
    );

    if (res.ok) {
      fetchSubscriptionData();
      deletedsubscription();
    }
  };

  const getcustomeval = () => {
    setEditid("");
    setFiles([]);
    setFormData({
      id: "",
      trainee: "",
      year: "",
      date: "",
      monthsSelected: "",
      subscriptionType: "",
      amount: ""
    });
    const options = customerData.map((customer) => ({
      value: customer._id,
      label: `${customer.firstName} ${
        customer.middleName ? customer.middleName + " " : ""
      }${customer.lastName} - ${customer.mobile}`
    }));
    setOptions(options);
    setModal1(true);
  };

  

  const handleDateChange = (date: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date[0] ? date[0].toISOString().split("T")[0] : ""
    }));
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
    trainee: "",
    year: "",
    date: "",
    monthsSelected: "",
    subscriptionType: "",
    amount: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const handleMonthsSelectedChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prevFormData) => ({
      ...prevFormData,
      monthsSelected: selectedValues
    }));
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: editid
    }));
  }, [editid]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (!editid) {
      try {
        const res = await fetch("/api/subscription", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          newTraineeadded();
          fetchSubscriptionData();
          setModal1(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const url = `/api/subscription/${editid}`;

        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          throw new Error("failed to update subscription");
        }
        if (res.ok) {
          setModal1(false);
          fetchSubscriptionData();
          updatedSubscription();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateClick = async (value: any) => {
    try {
      console.log("Fetching data for ID:", value); // Log the value to ensure it is correct
      const res = await fetch(
        `/api/subscription/${value}`,
        {
          method: "GET"
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch data for ID: ${value}`);
      }
      const data = await res.json();
      console.log("Fetched data:", data); // Log the fetched data

      setFormData(data.subscription);
      setEditid(data.subscription._id); // Set the edit ID to ensure we are updating the correct record
      setModal1(true); // Moved inside the try block to ensure it opens only if fetch is successful
      if (res.ok) {
        fetchSubscriptionData();
      }
    } catch (error) {
      console.error("Fetch error:", error); // Log any errors
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="panel mt-6">
      <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
        Subscriptions
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
                          <div className="text-lg font-bold">
                            Add Subscription
                          </div>
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
                                <label htmlFor="trainee">Trainee</label>
                                <div>
                                  <select
                                    id="trainee"
                                    name="trainee"
                                    className="form-select"
                                    onChange={handleChange}
                                    value={formData.trainee}
                                  >
                                    <option value="">Select Trainee</option>
                                    {traineeData.map((trainee) => (
                                      <option
                                        key={trainee.id}
                                        value={trainee.id}
                                      >
                                        {trainee.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="year">Year</label>
                                <select
                                  id="year"
                                  name="year"
                                  className="form-select"
                                  onChange={handleChange}
                                  value={formData.year}
                                >
                                  <option value="">Select Year</option>
                                  {years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label htmlFor="date">Date</label>
                                <Flatpickr
                                  id="date"
                                  value={formData.date}
                                  options={{
                                    dateFormat: "Y-m-d",
                                    position: isRtl ? "auto right" : "auto left"
                                  }}
                                  className="form-input"
                                  onChange={handleDateChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="monthsSelected">
                                  Months Selected
                                </label>
                                <Select
                                  id="monthsSelected"
                                  name="monthsSelected"
                                  options={monthOptions}
                                  isMulti
                                  onChange={handleMonthsSelectedChange}
                                  value={monthOptions.filter((option) =>
                                    formData.monthsSelected.includes(
                                      option.value
                                    )
                                  )}
                                  className="form-select"
                                />
                              </div>
                              <div>
                                <label htmlFor="subscriptionType">
                                  Subscription Type
                                </label>
                                <select
                                  id="subscriptionType"
                                  name="subscriptionType"
                                  className="form-select"
                                  onChange={handleChange}
                                  value={formData.subscriptionType}
                                >
                                  <option value="">
                                    Select Subscription Type
                                  </option>
                                  {subscriptionOptions.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label htmlFor="amount">Amount</label>
                                <input
                                  id="amount"
                                  type="text"
                                  name="amount"
                                  placeholder="Enter amount"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.amount}
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
            Add Subscription
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
      <div className="datatables">
        <DataTable
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={recordsData}
          columns={[
            { accessor: "id", title: "#", sortable: true },
            { accessor: "trainee", sortable: true },
            { accessor: "year", sortable: true },
            { accessor: "date", sortable: true },
            {
              accessor: "monthsSelected",
              sortable: true,
              render: ({ monthsSelected }) => monthsSelected.join(", ") // Format the months as a comma-separated string
            },
            { accessor: "subscriptionType", sortable: true },
            { accessor: "amount", sortable: true },
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
              )
            }
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
                        onClick={handleDeleteData}
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

export default ComponentsDatatablesSubscription;
