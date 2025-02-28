import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe } from "vitest";
import { routerConfig } from "../App";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { addNote } from "../store/notesSlice";
import userEvent from "@testing-library/user-event";

describe("노트 정렬", () => {
  it("버튼 클릭시 정렬", async () => {
    const router = createMemoryRouter(routerConfig);

    const { getByText, getAllByTestId } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const notes = [
      {
        id: 1,
        title: "2 Title",
        content: "Content 1",
        time: new Date(2024, 8, 22),
      },
      {
        id: 2,
        title: "2 Title",
        content: "Content 2",
        time: new Date(2024, 8, 24),
      },
      {
        id: 3,
        title: "3 Title",
        content: "Content 3",
        time: new Date(2024, 8, 26),
      },
    ];

    notes.forEach((n) => store.dispatch(addNote(n)));

    await userEvent.click(getByText("최근"));

    await waitFor(() => {
      const sortedNotes = getAllByTestId("note-title");
      expect(soredNotes[0].textContent).toBe("3 Title");
      expect(soredNotes[1].textContent).toBe("1 Title");
      expect(soredNotes[2].textContent).toBe("2 Title");
    });

    await userEvent.click(getByText("이름 순"));

    await waitFor(() => {
      const sortedNotes = getAllByTestId("note-title");
      expect(sortedNotes[0].textContent).toBe("1 Title");
      expect(sortedNotes[1].textContent).toBe("2 Title");
      expect(sortedNotes[2].textContent).toBe("3 Title");
    });
  });
});
