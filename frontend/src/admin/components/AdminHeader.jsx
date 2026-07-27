const AdminHeader = ({ title, subtitle }) => {
    return (
        <header
            className="
                flex
                items-center
                justify-between
                border-b
                border-[#E8DDD2]
                bg-white
                px-10
                py-6
            "
        >
            <div>
                <h1 className="font-heading text-3xl text-[#3A312B]">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-1 text-sm text-[#8B8075]">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="text-right">
                <p className="text-sm font-medium text-[#4B433C]">
                    Sandra & Dawid
                </p>

                <p className="mt-1 text-xs text-[#A99A8B]">
                    Administrator
                </p>
            </div>
        </header>
    );
};

export default AdminHeader;