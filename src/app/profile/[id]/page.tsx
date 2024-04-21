export default function UserProfile({params}:{params:any}){
    return(
        <>
        <div className="flex flex-col gap-2 items-center h-[650px] justify-center">
        <h1 className="text-4xl">Profile Page</h1>
        <p className="text-xl">Hello {params.id}</p>
        </div>
        
        </>
    )
}