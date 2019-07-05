class Profile {
  async getprofile() {
    const response = await fetch('/api/profile/');

    const responseData = await response.json();

    return responseData;
  }
}
