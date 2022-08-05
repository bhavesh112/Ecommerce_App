import { screen, render } from "@testing-library/react";
import { useField } from "formik";
import TextInput from "./TextInput";

jest.mock("formik");

describe("Test TextInput", () => {
  it("should render", () => {
    const mockMeta = {
      touched: false,
      error: "",
      initialError: "",
      initialTouched: false,
      initialValue: "",
      value: "",
    };
    const mockField = {
      value: "",
      checked: false,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      multiple: undefined,
      name: "firstName",
    };
    useField.mockReturnValue([mockField, mockMeta]);
    const mockProps = {
      ...mockField,
      label: "First Name",
    };
    render(<TextInput {...mockProps} />);
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  });

  it("should render with error", () => {
    const mockMeta = {
      touched: true,
      error: "Error",
      initialError: "",
      initialTouched: false,
      initialValue: "",
      value: "",
    };
    const mockField = {
      value: "",
      checked: false,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      multiple: undefined,
      name: "firstName",
    };
    useField.mockReturnValue([mockField, mockMeta]);
    const mockProps = {
      ...mockField,
      label: "First Name",
    };
    render(<TextInput {...mockProps} />);
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
