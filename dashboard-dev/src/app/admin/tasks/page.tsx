
import TaskCard from "components/admin/default/TaskCard";

export default function TasksPage() {
    return (
        <div className="flex flex-col justify-center gap-5 lg:gap-5">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <h1 className="flex justify-center text-2xl text-brand-800">Tasks</h1>
                    <TaskCard cardTitle="Tasks" />
                </div>
            </div>
        </div>
    )
}