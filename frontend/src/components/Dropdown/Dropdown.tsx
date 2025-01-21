import { DropdownContainer, Select, Option } from "./Dropdown.styles";

type DropdownProps = {
    options: string[];
    onChange: (value: string) => void;
    placeholder?: string;
};

function Dropdown(props: Readonly<DropdownProps>) {

    return (
        <DropdownContainer>
            <Select/>
        </DropdownContainer>
    );
}

export default Dropdown;
