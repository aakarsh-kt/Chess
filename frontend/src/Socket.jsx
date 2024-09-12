export const useSocket=()=>{
    const [socket,setSocket]=useState(null);
    useEffect(()=>{
        const newSocket=io("http://43.205.228.117:8080");
        setSocket(newSocket);
        return ()=>{
            newSocket.close();
        }
    },[]);
    return socket;
}
