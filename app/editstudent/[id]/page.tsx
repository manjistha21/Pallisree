import EditStudentForm from "@/components/components/EditStudentForm";


const getStudentById = async (id:any) => {



    try {
        const url = "http://localhost:3000/api/studentform/" + id;
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching:", error);
        return null; 
    } 
};

export default async function EditStudent({ params }:any) {
    const { id } = params;

    try {
        const  studentData = await getStudentById(id);
        
        if (!studentData) {
            return <div>Error: Failed to fetch</div>;
        }

        const { name,fathersname,guardiansname,guardiansoccupation,address,phoneno,date,nameoftheschool,bloodgroup} = studentData;

        return (
            <EditStudentForm
                id={id}
                name={name}
                fathersname={fathersname}
                guardiansname={guardiansname}
                guardiansoccupation={guardiansoccupation}
                address={address}
                phoneno ={phoneno }
                date={date}
                nameoftheschool={nameoftheschool }
                bloodgroup={bloodgroup }


            />
        );
    } catch (error) {
        console.error("Error fetching:", error);
        return <div>Error: Failed to fetch</div>;
    }
}
