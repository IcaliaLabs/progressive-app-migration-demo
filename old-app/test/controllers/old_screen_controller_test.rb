require 'test_helper'

class OldScreenControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get old_screen_show_url
    assert_response :success
  end

end
