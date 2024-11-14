type data={
    username: string;
    password: string;
}
export const postData = async (data:data):Promise<boolean> =>{
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
  
  
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${JSON.stringify(errorData.message)}`);
            return false
          }else{
            const result = await response.json();
            alert(result.message);
            return true
          }
        } catch (error) {
            return false
          console.error("Error al realizar la solicitud:", error);
        }
};

export default postData;