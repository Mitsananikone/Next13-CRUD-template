/** @format */

import Link from "next/link";
import { useState, useEffect } from "react";

import { Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }

  return (
    <Layout >
      <h1>Users</h1>
      <Link
        href="/users/add"
        className="py-1 px-2 text-xs text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mb-2"
      >
        Add User
      </Link>
      <table class="mx-auto w-100 text-left table-auto divide-y divide-gray-200" >
        <thead>
          <tr>
            <th class="w-1/4 px-4 py-2">First Name</th>
            <th class="w-1/4 px-4 py-2">Last Name</th>
            <th class="w-1/4 px-4 py-2">Username</th>
            <th class="w-1/4 px-4 py-2">Email</th>
            <th class="w-1/12 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id} class="bg-gray-100 container-fluid">
                <td class="border px-4 py-2 w-1/5">{user.firstName}</td>
                <td class="border px-4 py-2 w-1/5">{user.lastName}</td>
                <td class="border px-4 py-2 w-1/5">{user.username}</td>
                <td class="border px-4 py-2 w-1/5">{user.email}</td>
                <td class="border px-4 py-2 whitespace-nowrap">
                  <Link
                    href={`/users/edit/${user.id}`}
                    class="inline-block px-2 py-1 text-sm font-semibold text-blue-700 bg-blue-200 rounded hover:bg-blue-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    class="inline-block w-20 px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span class="inline-block loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-4 w-4"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {users && !users.length && (
            <tr>
              <td colSpan="4" class="text-center">
                <div class="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
