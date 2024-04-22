import LogoutButton from '../components/logoutButton'




export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <>
        <div className='flex justify-end pr-2 my-3'>
            <LogoutButton/>
        </div>
        {children}
    </>   
  );
}
