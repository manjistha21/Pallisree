"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


interface EditCustomerFormProps {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  countryofbirth: string;
  nationality: string;
  email: string;
  occupation: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zip: string;
  mobile: string;
}
export default function EditCustomerForm({ id }: EditCustomerFormProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    countryofbirth: "",
    nationality: "",
    email: "",
    occupation: "",
    country: "",
    state: "",
    city:" ",
    address: "",
    zip: "",
    mobile: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchCustomerData = async () => {
    const res = await fetch(`/api/customer/${id}`, {
      method: "GET",
    });
    const data = await res.json();

    if (res.ok) {
      setFormData(data.customer);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update customer:");
      }

      router.push("/customers");
    } catch (error) {
      console.log(error);
    }
  };





  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands",
  ];

  const Occupation = [
    "Software Engineer",
    "Teacher",
    "Doctor",
    "Nurse",
    "Graphic Designer",
    "Accountant",
    "Electrician",
    "Plumber",
    "Lawyer",
    "Chef",
    "Writer",
    "Artist",
    "Architect",
    "Mechanic",
    "Pilot",
    "Police Officer",
    "Firefighter",
    "Real Estate Agent",
    "Photographer",
    "Musician",
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <div className="mb-5">
          <form className="space-y-5" onSubmit={handleSubmit}>

          <div className="my-5 flex gap-10">
                <div>
                  <label htmlFor="groupFname">First Name</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="firstName"
                    value={formData.firstname}
                    placeholder="Enter First Name"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>
            </div>
            <div>
                  <label htmlFor="groupLname">Middile Name</label>
                  <input
                    id="groupLname"
                    type="text"
                    name="middleName"
                    value={formData.middlename}
                    placeholder="Enter Last Name"
                    className="form-input"
                    onChange={handleChange}
                  />
            </div>
            <div>
                  <label htmlFor="groupLname">Last Name</label>
                  <input
                    id="groupLname"
                    type="text"
                    name="lastName"
                    value={formData.lastname}
                    placeholder="Enter Last Name"
                    className="form-input"
                    onChange={handleChange}
                  />
            </div>
            <div>
                  <label htmlFor="groupLname">Country Of Birth</label>
                  <select
                    id="ctnSelect1"
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                    name="countryOfBirth"
                    value={formData.countryofbirth}
                    
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>{" "}
                </div>
                <div>
                  <label htmlFor="groupLname">Nationality</label>
                  <select
                    id="ctnSelect2"
                    name="nationality"
                    value={formData.nationality}
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>{" "}
                </div>
                <div className="my-5 flex gap-10">
                <div>
                  <label htmlFor="ctnEmail">Email address</label>
                  <input
                    id="ctnEmail"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="name@example.com"
                    className="form-input"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="groupLname">Occupation</label>
                  <select
                    id="ctnSelect2"
                    name="occupation"
                    value={formData.occupation}
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select a Occupation</option>
                    {Occupation.map((occupation) => (
                      <option key={occupation} value={occupation}>
                        {occupation}
                      </option>
                    ))}
                  </select>{" "}
                </div>
            </div>
            <div className="my-5 flex gap-10">
                <div>
                  <label htmlFor="groupLname">Country</label>
                  <select
                    id="ctnSelect2"
                    name="country"
                    value={formData.country}
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>{" "}
                </div>
            </div>

                <div>
                  <label htmlFor="groupFname">State</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="state"
                    value={formData.state}
                    placeholder="Enter State"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="groupFname">City</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="Enter City"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>
                <div className="my-5">
                <label htmlFor="ctnTextarea">Address</label>
                <textarea
                  id="ctnTextarea"
                  rows={3}
                  className="form-textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                ></textarea>
                </div>
              <div className="flex gap-10">
                <div>
                  <label htmlFor="groupFname">Zip</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    placeholder="Enter Zip"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="groupFname">Mobile</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    placeholder="Enter Mobile No"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary !mt-6">
              Submit
            </button>
          </form>{" "}
         </div>
        </div>
      </div>
  )};