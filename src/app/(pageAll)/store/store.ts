import { create } from "zustand";
interface ApiState {
	loading: boolean;
	setLoading: (isLoading: boolean) => void;
}
const LoadingStore = create<ApiState>((set) => ({
	loading: true,
	setLoading: (isLoading) => set({ loading: isLoading }),
}));

interface Toast {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
}
const OpenStore = create<Toast>((set) => ({
	open: false,
	setOpen: (isOpen) => set({ open: isOpen }),
}));

interface loadSign {
	load: boolean;
	setLoad: (isLoad: boolean) => void;
}
const SignLoad = create<loadSign>((set) => ({
	load: false,
	setLoad: (isLoad) => set({ load: isLoad }),
}));

export { LoadingStore, OpenStore, SignLoad };
