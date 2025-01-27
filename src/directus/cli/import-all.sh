#!/bin/bash

import() {
    echo "Importing $1 ..."
    ./directus-cli import:$1
    echo "Done"
    echo ""
}

import "schema"
import "roles"
import "flows"
import "presets"
import "translations"
import "webhooks"
#import "items"
import "settings"
