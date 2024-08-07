import { React } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import CreateEditProduct from "./CreateEditProduct";
import { useUser } from "../contexts/hooks";
import { getDoc, doc } from "@firebase/firestore";

jest.mock("@firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  db: {},
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../contexts/hooks", () => ({
  useUser: jest.fn(),
}));

describe("CreateEditProduct Component", () => {
  beforeEach(() => {
    useUser.mockReturnValue({ uid: "testUser" });
    useParams.mockReturnValue({ id: "testProductId" });
  });

  test("product id not found", () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });

    render(
      <Router>
        <CreateEditProduct />
      </Router>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
  });

  test("fetches product data if id is provided", async () => {
    const mockData = {
      Name: "Test Product",
      Description: "Test Description",
      Price: 100,
    };
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => mockData });

    render(
      <Router>
        <CreateEditProduct />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i).value).toBe("Test Product");
      expect(screen.getByLabelText(/Description/i).value).toBe(
        "Test Description"
      );
      expect(screen.getByLabelText(/Price/i).value).toBe("100");
    });
  });

  test("handles input changes", async () => {
    const mockData = {
      Name: "Test Product",
      Description: "Test Description",
      Price: 100,
    };
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => mockData });

    const { getByLabelText } = render(
      <Router>
        <CreateEditProduct />
      </Router>
    );

    await act(async () => {
      fireEvent.change(getByLabelText(/Name/i), {
        target: { value: "New Product 123456" },
      });
      fireEvent.change(getByLabelText(/Description/i), {
        target: { value: "New Description" },
      });
      fireEvent.change(getByLabelText(/Price/i), {
        target: { value: "200" },
      });

      expect(getByLabelText(/Name/i).value).toBe("New Product 123456");
      expect(getByLabelText(/Description/i).value).toBe("New Description");
      expect(getByLabelText(/Price/i).value).toBe("200");
    });
  });

  test("handles form submission", async () => {
    const mockData = {
      Name: "Test Product",
      Description: "Test Description",
      Price: 100,
    };
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => mockData });

    const { getByLabelText, getByText } = render(
      <Router>
        <CreateEditProduct />
      </Router>
    );

    await act(async () => {
      fireEvent.change(getByLabelText(/Name/i), {
        target: { value: "New Product" },
      });
      fireEvent.change(getByLabelText(/Description/i), {
        target: { value: "New Description" },
      });
      fireEvent.change(getByLabelText(/Price/i), { target: { value: "200" } });

      fireEvent.submit(getByText(/Update/i));
    });
  });
});
