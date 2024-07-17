"use client";



import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useEffect } from "react";




interface EditOrderFormProps {
    name: string;
    fathersname: string;
    guardiansname: string;
    guardiansoccupation: string;
    address: string;
    phoneno: string;
    date: string;
    nameoftheschool: string;
    bloodgroup: string;
  }




  export default function EditOrderForm({ id }: EditOrderFormProps) {




    const [formData, setFormData] = useState({
        name: "",
        fathersname: "",
        guardiansname: "",
        guardiansoccupation: "",
        address: "",
        phoneno: "",
        date:"",
        nameoftheschool: "",
        bloodgroup: "",
      });



      const dispatch = useDispatch();
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const [date1, setDate1] = useState<any>("2022-07-05");



      const router = useRouter();



      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
          ...formData,
          [name]: value
        }));
      };

      const handleDateChange = (date) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          date: date[0].toISOString(), // Convert the date to ISO format
        }));
      };




      const fetchStudentData = async () => {

        const res = await fetch(`/api/studentform/${id}`, {
            method: "GET",
          });
          const data = await res.json();
        
      
          if (res.ok) {
            setFormData(data.student);
          }
        };
      
        useEffect(() => {
          fetchStudentData();
        }, []);
      
        const handleSubmit = async (e: any) => {
          e.preventDefault();
      
          try {
            const res = await fetch(`http://localhost:3000/api/studentform/${id}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(formData), 
            });
      
            if (!res.ok) {
              throw new Error("Failed to update:");
            }
      
            router.push("/students");
          } catch (error) {
            console.log(error);
          }
        };




        return (
            <div>
              
        
              <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
                <div className="mb-5">
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="groupFname">Name</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        value={formData.name}
                        className="form-input"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Father's Name</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="fathersname"
                        placeholder="Enter Father's Name"
                        onChange={handleChange}
                        value={formData.fathersname}
                        className="form-input"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Guardian's Name</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="guardiansname"
                        placeholder="Enter Guardian's Name"
                        onChange={handleChange}
                        value={formData.guardiansname}
                        className="form-input"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Guardian's Occupation</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="guardiansoccupation"
                        placeholder="Enter Guardian's Occupation"
                        onChange={handleChange}
                        value={formData.guardiansoccupation}
                        className="form-input"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Address</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        onChange={handleChange}
                        value={formData.address}
                        className="form-input"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Phone no.</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="phoneno"
                        placeholder="Enter Phone No."
                        onChange={handleChange}
                        value={formData.phoneno}
                        className="form-input"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Date of Birth</label>
        
                      <Flatpickr
                        value={date1}
                        name="date"
                        options={{
                          dateFormat: "Y-m-d",
                          position: isRtl ? "auto right" : "auto left"
                        }}
                        className="form-input"
                        onChange={handleDateChange}
                        value={formData.date}
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Name of the school</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="nameoftheschool"
                        placeholder="Enter School Name"
                        onChange={handleChange}
                        value={formData.nameoftheschool}
                        className="form-input"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="groupFname">Blood Group</label>
                      <input
                        id="groupFname"
                        type="text"
                        name="bloodgroup"
                        placeholder="Enter Blood Group"
                        onChange={handleChange}
                        className="form-input"
                        value={formData.bloodgroup}
                      />
                    </div>
        
                    <div>
                      <label htmlFor="ctnFile">Document Upload</label>
                      <input
                        id="ctnFile"
                        type="file"
                        className="rtl:file-ml-5 form-input p-0 file:border-0 file:bg-primary/90 file:px-4 file:py-2 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
                        
                        onChange={handleChange}
                      />
                    </div>
        
                    <button type="submit" className="btn btn-primary !mt-6">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        };
        



