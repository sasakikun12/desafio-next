import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getAllProducts } from "@/resources/products";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");

  useEffect(() => {
    if (token && userId) {
      getAllProducts(token, username)
        .then((response) => {
          setData(response.data.products || []);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Falha ao buscar os produtos");
        });
    }
  }, [token, userId]);

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    router.push("/login");
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sair</button>
      <h1>Home</h1>
      {data[0] ? (
        data.map((value, index) => <div key={value?.id}>{value.id}</div>)
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
