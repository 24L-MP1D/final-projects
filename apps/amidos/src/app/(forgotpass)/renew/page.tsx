import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewPassword({ submit }: { submit: () => void }) {
  return (
    <div className="max-w-[334px] mx-auto grid gap-5 py-20">
      <h1 className="text-lg text-[#09090B] font-semibold text-center">Нууц үг сэргээх</h1>
      <Input type="password" placeholder="Шинэ нууц үг" className="rounded-full" />
      <Input type="password" placeholder="Шинэ нууц үг давтах" className="rounded-full" />
      <div className="grid gap-2">
        <li className="text-xs">Том үсэг орсон байх</li>
        <li className="text-xs">Жижиг үсэг орсон байх</li>
        <li className="text-xs">Тоо орсон байх</li>
        <li className="text-xs text-[#E11D48]">Тэмдэгт орсон байх</li>
      </div>
      <Button className="w-full bg-[#2563EB] rounded-full" onClick={submit}>
        Үүсгэх
      </Button>
    </div>
  );
}
