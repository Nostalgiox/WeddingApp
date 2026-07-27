import AdminHeader from "../components/AdminHeader";

const AdminMissionsPage = () => {
    return (
        <>
            <AdminHeader
                title="Misje"
                subtitle="Zarządzaj Misjami Weselnymi"
            />

            <section className="p-10">
                <div className="rounded-2xl border border-[#E8DDD2] bg-white p-8">
                    <p className="text-[#7B7065]">
                        Tutaj pojawią się Misje Weselne.
                    </p>
                </div>
            </section>
        </>
    );
};

export default AdminMissionsPage;