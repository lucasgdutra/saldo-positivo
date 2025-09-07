"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const PREDEFINED_COLORS = [
	"#3B82F6", // Blue
	"#EF4444", // Red
	"#10B981", // Green
	"#F59E0B", // Yellow
	"#8B5CF6", // Purple
	"#EC4899", // Pink
	"#F97316", // Orange
	"#06B6D4", // Cyan
	"#84CC16", // Lime
	"#6B7280", // Gray
	"#DC2626", // Dark Red
	"#059669", // Dark Green
	"#7C3AED", // Dark Purple
	"#DB2777", // Dark Pink
	"#EA580C", // Dark Orange
	"#0891B2", // Dark Cyan
];

interface ColorPickerProps {
	value: string;
	onChange: (color: string) => void;
	disabled?: boolean;
}

export function ColorPicker({ value, onChange, disabled }: ColorPickerProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<label className="block text-sm font-medium mb-2">Cor da Categoria</label>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				disabled={disabled}
				className="w-full flex items-center gap-3 px-3 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<div
					className="w-6 h-6 rounded-full border-2 border-gray-300"
					style={{ backgroundColor: value }}
				/>
				<span className="text-sm text-gray-700">{value.toUpperCase()}</span>
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 mt-1 p-3 bg-white border rounded-lg shadow-lg z-[70]">
					<div className="grid grid-cols-4 gap-2 w-48">
						{PREDEFINED_COLORS.map((color) => (
							<button
								key={color}
								type="button"
								onClick={() => {
									onChange(color);
									setIsOpen(false);
								}}
								className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform relative flex items-center justify-center"
								style={{ backgroundColor: color }}
							>
								{value === color && (
									<Check className="w-4 h-4 text-white drop-shadow-sm" />
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}