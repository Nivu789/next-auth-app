export default function UserProfile({params}:{params:any}){
    return(
        <>
        <div className="flex flex-col gap-3 items-center h-screen justify-center">
        <h1 className="text-4xl">Profile Page</h1>
        <p className="text-xl">Hello {params.id}</p>
        </div>
        
        </>
    )
}