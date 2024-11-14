type data={
    name: string,
    lastname: string,
    birthdate: string,
    country: string,
    city: string,
    email: string,
    username: string,
    password: string,
    dni: string,
}
export const postData = async (values:data) =>{
    const data = { ...values, birthdate: new Date(values.birthdate) };
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
  
  
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${JSON.stringify(errorData.message)}`);
          }else{
            const result = await response.json();
            alert(result.message);
          }
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
        }
};

export default postData;