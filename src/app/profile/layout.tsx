import LogoutButton from '../components/logoutButton'


export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <>
        <div className='flex justify-end pr-2'>
            <LogoutButton/>
        </div>
        {children}
    </>   
  );
}
