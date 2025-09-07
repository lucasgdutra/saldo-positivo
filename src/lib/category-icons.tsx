import {
	Banknote,
	Briefcase,
	Car,
	Coffee,
	CreditCard,
	Folder,
	Fuel,
	Gamepad2,
	Gift,
	GraduationCap,
	Heart,
	Home,
	Phone,
	PiggyBank,
	Plane,
	Shirt,
	ShoppingCart,
	TrendingUp,
	Utensils,
	Zap,
} from "lucide-react";

export const CATEGORY_ICONS = {
	folder: Folder,
	"shopping-cart": ShoppingCart,
	home: Home,
	car: Car,
	utensils: Utensils,
	"gamepad-2": Gamepad2,
	"graduation-cap": GraduationCap,
	heart: Heart,
	plane: Plane,
	shirt: Shirt,
	gift: Gift,
	coffee: Coffee,
	fuel: Fuel,
	phone: Phone,
	zap: Zap,
	briefcase: Briefcase,
	"credit-card": CreditCard,
	"trending-up": TrendingUp,
	banknote: Banknote,
	"piggy-bank": PiggyBank,
};

export function getCategoryIcon(iconName: string) {
	return CATEGORY_ICONS[iconName as keyof typeof CATEGORY_ICONS] || Folder;
}
