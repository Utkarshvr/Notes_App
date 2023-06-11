import AlertStore from "./AlertStore";
import ModalStore from "./ModalContext";
import NoteStore from "./NoteStore";
import AuthStore from "./auth/AuthStore";

export default function Store({ children }) {
  return (
    <AlertStore>
      <AuthStore>
        <NoteStore>
          <ModalStore>{children}</ModalStore>
        </NoteStore>
      </AuthStore>
    </AlertStore>
  );
}
