type Props = {
  children: React.ReactNode;
};

const DefaultPage: React.FC<Props> = ({ children }) => {
  return (
    <div className="top-7.5 relative w-full my-6 mx-auto max-w-5xl max-h-[80vh] xlg:max-h-[90vh] bg-[#24303f] p-6 rounded-lg shadow-xl overflow-auto text-xs lg:text-sm">
      {children}
    </div>
  );
};

export default DefaultPage;
