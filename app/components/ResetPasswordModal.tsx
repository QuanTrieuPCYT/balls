import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ResetPasswordModal({ children }: { children: ReactNode}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            You forgot your key to balls? Don&#39;t worry we gotchu
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
            <Label htmlFor="email">Email associates to your account</Label>
            <Input id="email" type="password" placeholder="Type your associated email" />
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
