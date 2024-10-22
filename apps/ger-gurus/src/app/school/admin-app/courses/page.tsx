import { Button } from "@/src/app/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (<div>
        <Link href="/school/admin-app/courses/create"><Button>Add new course</Button></Link>

    </div>)
}