# Intentional CI/CD Failure for Testing

import requests
import numpy
import pandas

print("Starting application...")

# Intentional error
result = 10 / 0

print(result)