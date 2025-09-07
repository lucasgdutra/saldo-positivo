"use client";

import { useState } from "react";
import {
	Folder,
	ShoppingCart,
	Home,
	Car,
	Utensils,
	Gamepad2,
	GraduationCap,
	Heart,
	Plane,
	Shirt,
	Gift,
	Coffee,
	Fuel,
	Phone,
	Zap,
	Briefcase,
	CreditCard,
	TrendingUp,
	Banknote,
	PiggyBank,
} from "lucide-react";

const PREDEFINED_ICONS = [
	{ name: "folder", icon: Folder, label: "Pasta" },
	{ name: "shopping-cart", icon: ShoppingCart, label: "Compras" },
	{ name: "home", icon: Home, label: "Casa" },
	{ name: "car", icon: Car, label: "Transporte" },
	{ name: "utensils", icon: Utensils, label: "Alimentação" },
	{ name: "gamepad-2", icon: Gamepad2, label: "Entretenimento" },
	{ name: "graduation-cap", icon: GraduationCap, label: "Educação" },
	{ name: "heart", icon: Heart, label: "Saúde" },
	{ name: "plane", icon: Plane, label: "Viagem" },
	{ name: "shirt", icon: Shirt, label: "Roupas" },
	{ name: "gift", icon: Gift, label: "Presentes" },
	{ name: "coffee", icon: Coffee, label: "Café" },
	{ name: "fuel", icon: Fuel, label: "Combustível" },
	{ name: "phone", icon: Phone, label: "Telefone" },
	{ name: "zap", icon: Zap, label: "Energia" },
	{ name: "briefcase", icon: Briefcase, label: "Trabalho" },
	{ name: "credit-card", icon: CreditCard, label: "Cartão" },
	{ name: "trending-up", icon: TrendingUp, label: "Investimento" },
	{ name: "banknote", icon: Banknote, label: "Dinheiro" },
	{ name: "piggy-bank", icon: PiggyBank, label: "Poupança" },
];

interface IconPickerProps {
	value: string;
	onChange: (iconName: string) => void;
	disabled?: boolean;
}

export function IconPicker({ value, onChange, disabled }: IconPickerProps) {
	const [isOpen, setIsOpen] = useState(false);

	const selectedIcon = PREDEFINED_ICONS.find((icon) => icon.name === value);
	const SelectedIconComponent = selectedIcon?.icon || Folder;

	return (
		<div className="relative">
			<label className="block text-sm font-medium mb-2">Ícone da Categoria</label>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				disabled={disabled}
				className="w-full flex items-center gap-3 px-3 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<SelectedIconComponent className="w-5 h-5 text-gray-600" />
				<span className="text-sm text-gray-700">
					{selectedIcon?.label || "Ícone"}
				</span>
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 mt-1 p-3 bg-white border rounded-lg shadow-lg z-[70] max-h-64 overflow-y-auto">
					<div className="grid grid-cols-4 gap-2 w-64">
						{PREDEFINED_ICONS.map(({ name, icon: IconComponent, label }) => (
							<button
								key={name}
								type="button"
								onClick={() => {
									onChange(name);
									setIsOpen(false);
								}}
								className={`p-3 rounded-md hover:bg-gray-100 transition-colors flex flex-col items-center gap-1 ${
									value === name ? "bg-blue-50 text-blue-600" : "text-gray-600"
								}`}
								title={label}
							>
								<IconComponent className="w-5 h-5" />
								<span className="text-xs text-center leading-tight">
									{label}
								</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}