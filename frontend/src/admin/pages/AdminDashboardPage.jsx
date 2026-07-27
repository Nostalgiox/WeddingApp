import AdminHeader from "../components/AdminHeader";

const AdminDashboardPage = () => {
    return (
        <>
            <AdminHeader
                title="Dashboard"
                subtitle="Zarządzaj aplikacją weselną"
            />

            <section className="p-10">
                <div className="grid grid-cols-3 gap-6">

                    <div className="rounded-2xl border border-[#E8DDD2] bg-white p-6">
                        <p className="text-sm text-[#8B8075]">
                            Zdjęcia
                        </p>

                        <p className="mt-3 font-heading text-4xl text-[#3A312B]">
                            —
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E8DDD2] bg-white p-6">
                        <p className="text-sm text-[#8B8075]">
                            Ukończone misje
                        </p>

                        <p className="mt-3 font-heading text-4xl text-[#3A312B]">
                            — / 16
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E8DDD2] bg-white p-6">
                        <p className="text-sm text-[#8B8075]">
                            Życzenia
                        </p>

                        <p className="mt-3 font-heading text-4xl text-[#3A312B]">
                            —
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
};

export default AdminDashboardPage;