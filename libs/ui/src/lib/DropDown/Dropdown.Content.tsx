import { generateE2eId } from '@mezon/utils';
import { ReactNode } from 'react';

type MenuItemProps = {
	children: ReactNode;
	onClick: () => void;
	className?: string;
};
const Item = ({ children, onClick, className }: MenuItemProps) => {
	return (
		<div className={`rounded-lg p-2 ${className}`} onClick={onClick} data-e2e={generateE2eId('dropdown.item')}>
			{children}
		</div>
	);
};
Item.displayName = 'MenuItem';

export { Item };
