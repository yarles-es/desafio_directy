type TableProps = {
  children: React.ReactNode;
  table?: boolean;
};

const DefaultTable: React.FC<TableProps> = ({ children, table = true }) => {
  const component = table ? (
    <table className="w-full  table-auto min-w-max">{children}</table>
  ) : (
    <div className="w-full  table-auto min-w-max">{children}</div>
  );

  return (
    <div className="text-xs rounded-sm border  px-5 pt-6 pb-2.5 shadow-default border-[#2e3a47] bg-[#24303f] sm:px-2 xl:pb-3 mb-5">
      <div className={`overflow-x-auto overflow-y-auto max-h-96`}>
        {component}
      </div>
    </div>
  );
};

export default DefaultTable;
