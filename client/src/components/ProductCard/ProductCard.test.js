import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

jest.mock("../../services/auth.service", () => {
  return {
    useGetUser: () => {
      return {
        isAdmin: true,
        isAuthenticated: true,
      };
    },
  };
});

jest.mock("../../services/admin.service", () => {
  return {
    useDeleteProductMutation: () => {
      return {
        deleteProduct: jest.fn(),
      };
    },
  };
});
jest.mock("react-router-dom");
jest.mock("../../services/cart.service", () => {
  return {
    useAddToCart: () => {
      return {
        addToCart: jest.fn(),
      };
    },
  };
});

describe("Test ProductCard", () => {
  it("should render", () => {
    const mockProps = {
      product: {
        _id: "1",
        name: "Product 1",
        price: 1,
        productPicture: [
          {
            img: "https://picsum.photos/200/300",
          },
        ],
        description: "Description",
      },
    };
    render(<ProductCard {...mockProps} />);
    expect(screen.getByText(mockProps.product.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.product.description)).toBeInTheDocument();
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });
});
