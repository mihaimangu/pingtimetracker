import psutil
import time
from datetime import datetime
import requests

url = "http://localhost:8000/ping?id=65a95e0ffac8808217455372"

def get_active_window_title():
    try:
        import ctypes
        # Get the handle of the foreground window
        foreground_window_handle = ctypes.windll.user32.GetForegroundWindow()
        
        # Get the length of the window text
        length = ctypes.windll.user32.GetWindowTextLengthW(foreground_window_handle) + 1

        # Create a buffer to store the window title
        buffer = ctypes.create_unicode_buffer(length)

        # Get the window title and store it in the buffer
        ctypes.windll.user32.GetWindowTextW(foreground_window_handle, buffer, length)

        return buffer.value
    except Exception as e:
        print(f"Error getting active window title: {e}")
        return None

def track_game_time(game_name):
    start_time = None
    total_time = 0

    try:
        while True:
            print(f"Monitoring, total time matching is {total_time}")
            active_window_title = get_active_window_title()

        

            if active_window_title and game_name.lower() in active_window_title.lower():
                # add to the total_time
                new_time = total_time + 1
                total_time = total_time + 1

                if new_time % 60 == 0:
                    print(f"A new minute has passed")
                    response = requests.get(url)


                if start_time is None:
                    start_time = time.time()
            else:
                if start_time is not None:
                    end_time = time.time()
                    elapsed_time = end_time - start_time
                    print(f"Time spent on {game_name}: {elapsed_time:.2f} seconds")
                    start_time = None

            time.sleep(1)

    except KeyboardInterrupt:
        print("Monitoring stopped.")

if __name__ == "__main__":
    game_name = input("Enter the name of the game you want to track: ")
    
    try:
        track_game_time(game_name)
    except Exception as e:
        print(f"An error occurred: {e}")