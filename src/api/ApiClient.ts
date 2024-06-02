type URLString = string;

interface ApiClientInterface {
  get<T>(path: string, params: URLSearchParams): Promise<T>;
  post(path: string, body: object): Promise<void>;
  delete(path: string): Promise<void>;
}

export default class ApiClient implements ApiClientInterface {
  private baseUrl: URL;
  private header?: Headers;

  constructor(baseUrl: URLString, header: HeadersInit) {
    this.baseUrl = new URL(baseUrl);
    this.header = new Headers(header);
  }

  async get<T>(path: string, params?: URLSearchParams): Promise<T> {
    const url = `${this.baseUrl.toString()}${path}${
      params ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      headers: this.header,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.statusText);
    }
  }

  async post(path: string, body: object): Promise<void> {
    const url = `${this.baseUrl.toString()}${path}`;

    const parsedBody = JSON.stringify(body);

    const response = await fetch(url, {
      method: "POST",
      headers: this.header,
      body: parsedBody,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async delete(path: string): Promise<void> {
    const url = `${this.baseUrl.toString()}${path}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: this.header,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
}
