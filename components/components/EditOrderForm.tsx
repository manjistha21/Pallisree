"use client";

import { useEffect,useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface EditOrderFormProps {
    id: string;
    tags: string;
    customer: string;
    reasonfortransfer: string;
    foreigncurrency: string;
    country: string;
    sourceoffunds: string;
  }



export default function EditOrderForm({ id }: EditOrderFormProps) {



    const reasons = [
        "gift",
        "shopping",
        "professional fee",
        "cost for student",
        "Family support",
        "loan repayment",
        "commision",
        "deposit for land purpose",
        "set up business",
        "Buy property",
        "a loan to buy house",
        "saleing own property",
        "consulting fee",
        "wedding",
        "freelancer",
        "donation to pay a teacher",
        "donation to school",
        "family gift",
        "personal",
      ];





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
    
      const sourceoffunds = [
        "Personal savings",
        "family gift",
        "Property sale",
        "Business cost",
        "Trade between Remittances",
        "Donations",
        "Business",
      ];


    const [formData, setFormData] = useState({
        tags: "",
        customer: "",
        reasonfortransfer: "",
        foreigncurrency: "",
        country: "",
        sourceoffunds: "",
      });



      const router = useRouter();



      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };



      const fetchOrderData = async () => {

        const res = await fetch(`/api/order/${id}`, {
            method: "GET",
          });
          const data = await res.json();
        
      
          if (res.ok) {
            setFormData(data.order);
          }
        };
      
        useEffect(() => {
          fetchOrderData();
        }, []);
      
        const handleSubmit = async (e: any) => {
          e.preventDefault();
      
          try {
            const res = await fetch(`http://localhost:3000/api/order/${id}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(formData), 
            });
      
            if (!res.ok) {
              throw new Error("Failed to update order:");
            }
      
            router.push("/orders");
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
                         <label htmlFor="ctnSelect1">Tags</label>
                         <select
                           className="form-select text-white-dark"
                           name="tags"
                           value={formData.tags}
                           onChange={handleChange}
                        >
                           <option>IR-001 - Iran-AHMADI</option>
                          <option>
                           ETEMAD SA BRANCH - ETEMAD FIANCIAL SERVICES PTY
                           LTD-ADELAID BRANCH
                          </option>
                          <option>UAE-AHMADI AHMADI-UAE-BRANCH</option>
                          <option>PAK_ETEMAD - Pakistan-AHMADI</option>
                          <option>
                            ETEMAD WA BRANCH - ETEMAD FIANCIAL SERVICES PTY LTD -
                            PERTH BRANCH
                          </option>
                          <option>AF-KABUL-2 - KABUL-AHMADI</option>
                          </select>
                       </div>

                       <div>
                        <label htmlFor="groupFname">Customer</label>
                        <input
                          id="groupFname"
                          type="text"
                          name="customer"
                          placeholder="Customer"
                          className="form-input"
                          onChange={handleChange}
                        />
                       </div>

                       <div>
                        <label htmlFor="groupLname">Reason for transfer</label>
                        <select
                         id="ctnSelect2"
                         name="reasonfortransfer"
                         value={formData.reasonfortransfer}
                         className="form-select text-white-dark"
                         onChange={handleChange}
                        >
                        <option value="">Select reason</option>
                        {reasons.map((reason) => (
                        <option key={reason} value={reason}>
                        {reason}
                        </option>
                       ))}
                       </select>
                      </div>



                      <div>
                       <label htmlFor="ctnSelect1">Foreign currency</label>
                       <select
                        className="form-select text-white-dark"
                        name="foreigncurrency"
                        value={formData.foreigncurrency}
                        onChange={handleChange}
                        >
                        <option>AUD Australian currency</option>
                        </select>
                       </div>



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
                  </select>
                </div>

                <div>
                  <label htmlFor="groupLname">Source Of Funds</label>
                  <select
                    id="ctnSelect2"
                    name="sourceoffunds"
                    value={formData.sourceoffunds}
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select Source of Funds</option>
                    {sourceoffunds.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>




                <div className="w-100 my-2 mr-4 rounded-lg border border-gray-300 p-4">
                  <div>
                    <label htmlFor="groupFname">Quantity</label>
                    <input
                      id="groupFname"
                      type="text"
                      name="quantity"
                      defaultValue={0}
                      placeholder="Quantity"
                      className="form-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="groupFname">Commission</label>
                    <input
                      id="groupFname"
                      type="text"
                      name="commission"
                      defaultValue={0}
                      placeholder="Commission"
                      className="form-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="groupFname">Rate</label>
                    <input
                      id="groupFname"
                      type="text"
                      name="commission"
                      defaultValue={0}
                      placeholder="Commission"
                      className="form-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="groupFname">Total amount</label>
                    <input
                      id="groupFname"
                      type="text"
                      name="totalamount"
                      defaultValue={0}
                      placeholder="total_amount"
                      className="form-input"
                      onChange={handleChange}
                    />
                  </div>
                </div>





                <button type="submit" className="btn btn-primary !mt-6">
              Submit
            </button>



                      </form>
                    </div>
                </div>
            </div>
    
        )};